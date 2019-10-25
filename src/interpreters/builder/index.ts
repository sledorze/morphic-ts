import { identity, Predicate, Refinement } from 'fp-ts/lib/function'
import * as m from 'monocle-ts'
import { Option } from 'fp-ts/lib/Option'

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
  some: m.Prism<Option<S>, S>
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
  some: m.Prism.some(),
  fromPredicate: m.Prism.fromPredicate
})

interface VariantAccessor<A, V extends A, Tag extends string>
  extends MonocleFor<V>,
    Builders<A, V, Tag>,
    Predicates<A, V> {}

type Variants<A, Tag extends string, Tags extends string[]> = {
  [Key in ElemType<Tags>]: VariantAccessor<A, VariantType<A, Tag, Key>, Tag>
}

/**
 * Narrow the Tagged Union to the actual tags by extracting the right Union components
 */
type NarrowedTaggedAccessors<A, Tag extends string, Tags extends string[]> = Variants<
  Extract<A, { [k in Tag]: any }>,
  Tag,
  Tags
>

type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => NarrowedTaggedAccessors<A, Tag, typeof tags>

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
  return variants as any
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
