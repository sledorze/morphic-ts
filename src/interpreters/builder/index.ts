import { identity } from 'fp-ts/lib/function'
import { ElemType, TagsOf, ExtractUnion, ExcludeUnion, assignFunction } from '../../common'
import * as M from './index-monocle'
import * as Ma from './index-matcher'
import * as PU from './index-predicates'
import * as CU from './index-ctors'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

export interface ADT<A, Tag extends keyof A & string>
  extends Ma.Matchers<A, Tag>,
    PU.Predicates<A, Tag>,
    CU.Ctors<A, Tag>,
    M.MonocleFor<A> {
  <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  select: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  exclude: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag>
}

export type ByTag<A> = <Tag extends TagsOf<A> & string>(t: Tag) => ADT<A, Tag>

export const makeByTag = <A>(): ByTag<A> => tag => {
  type Tag = typeof tag

  const ctors = CU.Ctors<A, Tag>(tag)
  const predicates = PU.Predicates<A, Tag>(tag)
  const monocles = M.MonocleFor<A>()
  const matchers = Ma.Matchers<A, Tag>(tag)
  const select = <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag> =>
    res as any
  const exclude = <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag> =>
    res as any
  const res: ADT<A, Tag> = assignFunction(select, {
    ...ctors,
    ...predicates,
    ...monocles,
    ...matchers,
    select,
    exclude
  })
  return res
}

export class BuilderType<A> {
  byTag: ByTag<A>

  constructor(public build: Builder<A>) {
    this.byTag = makeByTag<A>()
  }
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Builder: BuilderType<A>
  }
}
