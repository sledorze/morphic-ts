import { ElemType, TagsOf, ExtractUnion, ExcludeUnion, assignFunction } from '../common'
import * as M from './monocle'
import * as Ma from './matcher'
import * as PU from './predicates'
import * as CU from './ctors'
import { intersection, difference } from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import { record, array } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'

export interface ADT<A, Tag extends keyof A & string>
  extends Ma.Matchers<A, Tag>,
    PU.Predicates<A, Tag>,
    CU.Ctors<A, Tag>,
    M.MonocleFor<A> {
  <Keys extends (A[Tag] & string)[]>(...keys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  select: <Keys extends (A[Tag] & string)[]>(
    ...keys: Keys
  ) => ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  exclude: <Keys extends (A[Tag] & string)[]>(
    ...keys: Keys
  ) => ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag>
  tag: Tag
  keys: KeysDefinition<A, Tag>
}

export type ADTType<A extends ADT<any, any>> = CU.CtorType<A>

const mergeKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<A | B, Tag> => ({ ...a, ...b } as any)

const intersectKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<Extract<A, B>, Tag> => {
  const res = record.fromFoldable({ concat: x => x }, array.array)(
    intersection(eqString)(Object.keys(a), Object.keys(b)).map(k => tuple(k, null))
  )
  return res as KeysDefinition<Extract<A, B>, Tag>
}

const excludeKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  toRemove: Array<string>
): object => {
  const res = record.fromFoldable({ concat: x => x }, array.array)(
    difference(eqString)(Object.keys(a), toRemove).map(k => tuple(k, null))
  )
  return res
}

const keepKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  toKeep: Array<string>
): object => {
  const res = record.fromFoldable({ concat: x => x }, array.array)(
    intersection(eqString)(Object.keys(a), toKeep).map(k => tuple(k, null))
  )
  return res
}

export const unionADT = <AS extends [ADT<any, any>, ADT<any, any>, ...Array<ADT<any, any>>]>(
  as: AS
): ADT<ADTType<AS[number]>, AS[number]['tag']> => {
  const newKeys = array.reduceRight(as[0].keys, (x: AS[number], y) => mergeKeys(x.keys, y))(as)
  return adtByTag<ADTType<AS[number]>>()(as[0].tag)(newKeys as any) as any
}

export const intersectADT = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: ADT<A, Tag>,
  b: ADT<B, Tag>
): ADT<Extract<A, B>, Tag> => adtByTag<Extract<A, B>>()(a.tag as any)(intersectKeys(a.keys, b.keys))

export type KeysDefinition<A, Tag extends keyof A & string> = { [k in A[Tag] & string]: any }
export const isIn = <A, Tag extends keyof A & string>(keys: KeysDefinition<A, Tag>) => (
  k: string
) => k in keys

export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => (keys: KeysDefinition<A, Tag>) => ADT<A, Tag>

export const adtByTag = <A>(): ByTag<A> => tag => keys => {
  type Tag = typeof tag

  const ctors = CU.Ctors<A, Tag>(tag)(keys)
  const predicates = PU.Predicates<A, Tag>(tag)(keys)
  const monocles = M.MonocleFor<A>()
  const matchers = Ma.Matchers<A, Tag>(tag)(keys)
  const select = <Keys extends (A[Tag] & string)[]>(
    ...selectedKeys: Keys
  ): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag> =>
    adtByTag<ExtractUnion<A, Tag, ElemType<Keys>>>()(tag as any)(keepKeys(
      keys,
      selectedKeys
    ) as any)

  const exclude = <Keys extends (A[Tag] & string)[]>(
    ...excludedKeys: Keys
  ): ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag> =>
    adtByTag<ExcludeUnion<A, Tag, ElemType<Keys>>>()(tag as any)(excludeKeys(
      keys,
      excludedKeys
    ) as any)

  const res: ADT<A, Tag> = assignFunction((...x: any) => select(...x), {
    ...ctors,
    ...predicates,
    ...monocles,
    ...matchers,
    tag,
    keys,
    select,
    exclude
  }) as any
  return res
}
