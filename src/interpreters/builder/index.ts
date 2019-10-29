import { identity } from 'fp-ts/lib/function'
import { CtorNarrowed, Ctor, IsA, ElemType, VariantType, TagsOf } from '../../common'
import * as M from './index-monocle'
import * as Ma from './index-matcher'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

interface Builders<A, V extends A, Tag extends string> {
  of: Ctor<A, V, Tag>
  narrowed: CtorNarrowed<A, V, Tag>
}

interface Predicates<A, V extends A> {
  isA: IsA<A, V>
}

interface Variant<A, V extends A, Tag extends string> extends M.MonocleFor<V>, Builders<A, V, Tag>, Predicates<A, V> {}

type Variants<A, Tag extends string, Tags extends string[]> = {
  [Key in ElemType<Tags>]: Variant<A, VariantType<A, Tag, Key>, Tag>
}

interface ADTIntern<A, Tag extends keyof A & string, Tags extends string[]> extends Ma.Matchers<A, Tag> {
  variants: Variants<A, Tag, Tags>
}

interface ADT<A, Tag extends keyof A & string, Tags extends string[]>
  extends ADTIntern<Extract<A, { [h in Tag]: ElemType<Tags> }>, Tag, Tags> {}

export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => ADT<A, Tag, typeof tags>

export const makeByTag = <A>(): ByTag<A> => tag => (...keys) => {
  type ADec = Extract<
    A,
    {
      [h in typeof tag]: ElemType<typeof keys>
    }
  >
  const variants: Variants<ADec, typeof tag, typeof keys> = {} as any
  for (const key of keys) {
    const ctor = (rest: object) => ({
      [tag]: key,
      ...rest
    })
    variants[key as any] = {
      of: ctor,
      narrowed: ctor,
      isA: (rest: any) => rest[tag] === key,
      ...M.staticMonocle
    }
  }
  const matchers = Ma.makeMatchers<ADec, typeof tag>(tag)

  return {
    variants,
    ...matchers
  }
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
