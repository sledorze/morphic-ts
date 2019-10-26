import { identity, Predicate, Refinement } from 'fp-ts/lib/function'
import * as m from 'monocle-ts'
import { Option } from 'fp-ts/lib/Option'
import { Match, FStruct } from '../matcher/function'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

type Remove<A, Tag extends string> = { [k in Exclude<keyof A, Tag>]: A[k] }
type ElemType<A> = A extends Array<infer E> ? E : never

type VariantType<A, Tag extends string, Key> = Extract<A, { [t in Tag]: Key }>

type IsLiteral<T extends string, V> = Exclude<string, T> extends never ? never : V

export type TagsOf<A> = A extends Array<any>
  ? never
  : ({ [k in keyof A]-?: A[k] extends string ? IsLiteral<A[k], k> : never }[keyof A])

type Ctor<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => S
type CtorNarrowed<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => V
type IsA<S, V extends S> = (x: S) => x is V

type LenseFromProp<S> = <P extends keyof S>(prop: P) => m.Lens<S, S[P]>

type LenseFromProps<S> = <P extends keyof S>(
  props: Array<P>
) => m.Lens<
  S,
  {
    [K in P]: S[K]
  }
>
declare type OptionPropertyNames<S> = {
  [K in keyof S]-?: S[K] extends Option<any> ? K : never
}[keyof S]
declare type OptionPropertyType<S, K extends OptionPropertyNames<S>> = S[K] extends Option<infer A> ? A : never
type LenseFromOptionProp<S> = <P extends OptionPropertyNames<S>>(prop: P) => m.Optional<S, OptionPropertyType<S, P>> //
type LenseFromNullableProp<S> = <K extends keyof S>(k: K) => m.Optional<S, NonNullable<S[K]>>
type IndexFromAt<T> = <J, B>(at: m.At<T, J, Option<B>>) => m.Index<T, J, B>

interface PrismFromPredicate<S> {
  <S>(predicate: Predicate<S>): m.Prism<S, S>
  <S, A extends S>(refinement: Refinement<S, A>): m.Prism<S, A>
}

interface MonocleFor<S> {
  fromProp: LenseFromProp<S>
  fromProps: LenseFromProps<S>
  fromPath: m.LensFromPath<S>
  fromAt: IndexFromAt<S>
  fromOptionProp: LenseFromOptionProp<S>
  fromNullableProp: LenseFromNullableProp<S>
  prism: m.Prism<Option<S>, S>
  fromPredicate: PrismFromPredicate<S>
}

interface Builders<A, V extends A, Tag extends string> {
  of: Ctor<A, V, Tag>
  narrowed: CtorNarrowed<A, V, Tag>
}

interface Predicates<A, V extends A> {
  isA: IsA<A, V>
}

const makeMonocleFor = <S>(): MonocleFor<S> => ({
  fromProp: m.Lens.fromProp(),
  fromProps: m.Lens.fromProps(),
  fromPath: m.Lens.fromPath(),
  fromAt: m.Index.fromAt,
  fromOptionProp: m.Optional.fromOptionProp(),
  fromNullableProp: m.Optional.fromNullableProp(),
  prism: m.Prism.some(),
  fromPredicate: m.Prism.fromPredicate
})

interface Variant<A, V extends A, Tag extends string> extends MonocleFor<V>, Builders<A, V, Tag>, Predicates<A, V> {}

type Variants<A, Tag extends string, Tags extends string[]> = {
  [Key in ElemType<Tags>]: Variant<A, VariantType<A, Tag, Key>, Tag>
}

type Folder<A> = <R>(f: (a: A) => R) => (a: A) => R
type Matcher<A, Tag extends keyof A & string> = <R>(match: Match<FStruct<A>[Tag], R>) => (a: A) => R
type MatcherWiden<A, Tag extends keyof A & string> = <M extends Match<FStruct<A>[Tag], any>>(
  match: M
) => (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never

interface Matchers<A, Tag extends keyof A & string> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
}

interface ADT<A, Tag extends keyof A & string, Tags extends string[]> extends Matchers<A, Tag> {
  variants: Variants<Extract<A, { [k in Tag]: any }>, Tag, Tags>
}

type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => ADT<A, Tag, typeof tags>

const staticMonocle = makeMonocleFor<any>()

export const makeByTag = <A>(): ByTag<A> => tag => (...keys) => {
  const variants: any = {}
  for (const key of keys) {
    const ctor = (rest: object) => ({ [tag]: key, ...rest })
    variants[key] = {
      of: ctor,
      narrowed: ctor,
      isA: (rest: any) => rest[tag] === key,
      ...staticMonocle
    }
  }

  const match = (match: any) => (a: any) => match[a[tag]](a)

  return { variants, fold: identity, match, matchWiden: match } as any
}

export class BuilderType<A> {
  byTag: ByTag<A>

  constructor(public builder: Builder<A>) {
    this.byTag = makeByTag<A>()
  }
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Builder: BuilderType<A>
  }
}
