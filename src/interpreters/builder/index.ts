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

interface ADT<A, Tag extends keyof A & string, Tags extends string>
  extends Ma.Matchers<ExtractUnion<A, Tag, Tags>, Tag> {
  variants: Variants<A, Tag, Tags>
}

export interface ThereIsSomeMissingTags<A, B> {}

export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => ADT<A, Tag, ElemType<typeof tags>>

export type ByTagAll<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(
  ...tags: Tags
) => A[Tag] extends ElemType<typeof tags>
  ? ADT<A, Tag, ElemType<typeof tags>>
  : ThereIsSomeMissingTags<A[Tag], ElemType<typeof tags>>

export const makeByTag = <A>(): ByTag<A> => tag => (..._keys) => {
  type Tag = typeof tag
  type Keys = ElemType<typeof _keys>
  const keys = (_keys as unknown) as Keys[]

  type Union = ExtractUnion<A, Tag, Keys>
  const variants = {} as Variants<A, Tag, Keys>

  const ctors = C.Ctors<A, Tag>(tag)
  const predicates = P.Predicates<A>()
  const monocles = M.MonocleFor<Union>()

  for (const key of keys) {
    const variant: Variant<A, VariantType<A, Tag, Keys>, Tag> = {
      ...ctors(key),
      ...predicates(tag, key),
      ...monocles
    }
    variants[key] = variant
  }
  const matchers = Ma.Matchers<Union, Tag>(tag)

  const res: ADT<A, Tag, Keys> = {
    variants,
    ...matchers
  }
  return res as any
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
