import { identity } from 'fp-ts/lib/function'
import { ElemType, TagsOf, ExtractUnion, VariantType } from '../../common'
import * as M from './index-monocle'
import * as Ma from './index-matcher'
import * as C from './index-ctors'
import * as P from './index-predicates'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

interface Variant<A, V extends A, Tag extends string>
  extends M.MonocleFor<V>,
    C.CtorsIntern<A, V, Tag>,
    P.Predicates<A, V> {}

type Variants<A, Tag extends string, Tags extends string> = {
  [Key in Tags]: Variant<A, VariantType<A, Tag, Key>, Tag>
}

interface ADT<A, Tag extends keyof A & string, Keys extends string> extends Ma.Matchers<A, Tag> {
  variants: Variants<A, Tag, Keys>
}

interface ADTUnion<A, Tag extends keyof A & string, Keys extends string>
  extends ADT<ExtractUnion<A, Tag, Keys>, Tag, Keys> {}

export interface ThereIsSomeMissingTags<A, B> {}

export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => ADTUnion<A, Tag, ElemType<typeof tags>>

export type ByTagAll<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(
  ...tags: Tags
) => A[Tag] extends ElemType<typeof tags>
  ? ADTUnion<A, Tag, ElemType<typeof tags>>
  : ThereIsSomeMissingTags<A[Tag], ElemType<typeof tags>>

export const makeByTag = <A>(): ByTag<A> => tag => (..._keys) => {
  type Tag = typeof tag
  type Keys = ElemType<typeof _keys>
  const keys = (_keys as unknown) as Keys[]

  type Union = ExtractUnion<A, Tag, Keys>
  const variants = {} as Variants<Union, Tag, Keys>
  type VariantType = (typeof variants)[keyof typeof variants]

  const ctors = C.Ctors<Union, Tag>(tag)
  const predicates = P.Predicates<Union>()
  const monocles = M.MonocleFor<Union>()

  for (const key of keys) {
    const variant: VariantType = {
      ...ctors(key as any),
      ...predicates(tag, key as any),
      ...monocles
    } as any
    variants[key] = variant
  }
  const matchers = Ma.Matchers<Union, Tag>(tag)

  const res: ADT<Union, Tag, Keys> = {
    variants,
    ...matchers
  }
  return res
}

export class BuilderType<A> {
  byTag: ByTag<A>
  byTagAll: ByTagAll<A>

  constructor(public of: Builder<A>) {
    this.byTag = makeByTag<A>()
    this.byTagAll = this.byTag as ByTagAll<A>
  }
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Builder: BuilderType<A>
  }
}
