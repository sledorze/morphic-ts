import { ElemType, TagsOf, ExtractUnion, ExcludeUnion, assignFunction } from '../common'
import * as M from './monocle'
import * as Ma from './matcher'
import * as PU from './predicates'
import * as CU from './ctors'

export interface ADT<A, Tag extends keyof A & string>
  extends Ma.Matchers<A, Tag>,
    PU.Predicates<A, Tag>,
    CU.Ctors<A, Tag>,
    M.MonocleFor<A> {
  <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  select: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  exclude: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag>
}

export type ADTType<A extends ADT<any, any>> = CU.CtorType<A>

export const unionADT = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: ADT<A, Tag>,
  b: ADT<B, Tag>
): ADT<A | B, Tag> => a as any

export const intersectADT = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: ADT<A, Tag>,
  b: ADT<B, Tag>
): ADT<Extract<A, B>, Tag> => a as any

export type ByTag<A> = <Tag extends TagsOf<A> & string>(t: Tag) => ADT<A, Tag>

export const adtByTag = <A>(): ByTag<A> => tag => {
  type Tag = typeof tag

  const ctors = CU.Ctors<A, Tag>(tag)
  const predicates = PU.Predicates<A, Tag>(tag)
  const monocles = M.MonocleFor<A>()
  const matchers = Ma.Matchers<A, Tag>(tag)
  const select = <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag> =>
    res as any
  const exclude = <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag> =>
    res as any
  const res: ADT<A, Tag> = assignFunction((...x: any) => select(...x), {
    ...ctors,
    ...predicates,
    ...monocles,
    ...matchers,
    select,
    exclude
  }) as any
  return res
}
