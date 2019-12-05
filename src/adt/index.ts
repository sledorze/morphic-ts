import { ElemType, TagsOf, ExtractUnion, ExcludeUnion } from '../common'
import * as M from './monocle'
import * as Ma from './matcher'
import * as PU from './predicates'
import * as CU from './ctors'
import { intersection, difference } from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import { record, array } from 'fp-ts'
import { tuple, identity } from 'fp-ts/lib/function'

export interface ADT<A, Tag extends keyof A & string>
  extends Ma.Matchers<A, Tag>,
    PU.Predicates<A, Tag>,
    CU.Ctors<A, Tag>,
    M.MonocleFor<A> {
  select: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  exclude: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag>
  tag: Tag
  keys: KeysDefinition<A, Tag>
}

export type ADTType<A extends ADT<any, any>> = CU.CtorType<A>

const mergeKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<A | B, Tag> => ({ ...a, ...b } as any)

const recordFromArray = record.fromFoldable({ concat: identity }, array.array)
const toTupleNull = (k: string) => tuple(k, null)

const intersectKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<Extract<A, B>, Tag> =>
  recordFromArray(intersection(eqString)(Object.keys(a), Object.keys(b)).map(toTupleNull)) as KeysDefinition<
    Extract<A, B>,
    Tag
  >

const excludeKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  toRemove: Array<string>
): object => recordFromArray(difference(eqString)(Object.keys(a), toRemove).map(toTupleNull))

const keepKeys = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: KeysDefinition<A, Tag>,
  toKeep: Array<string>
): object => recordFromArray(intersection(eqString)(Object.keys(a), toKeep).map(toTupleNull))

export const unionADT = <AS extends [ADT<any, any>, ADT<any, any>, ...Array<ADT<any, any>>]>(
  as: AS
): ADT<ADTType<AS[number]>, AS[number]['tag']> => {
  const newKeys = array.reduceRight(as[0].keys, (x: AS[number], y) => mergeKeys(x.keys, y))(as)
  return makeADT(as[0].tag)(newKeys)
}

export const intersectADT = <A, B, Tag extends (keyof A & keyof B) & string>(
  a: ADT<A, Tag>,
  b: ADT<B, Tag>
): ADT<Extract<A, B>, Tag> => makeADT(a.tag)(intersectKeys(a.keys, b.keys))

export type KeysDefinition<A, Tag extends keyof A & string> = { [k in A[Tag] & string]: any }
export const isIn = <A, Tag extends keyof A & string>(keys: KeysDefinition<A, Tag>) => (k: string) => k in keys

export type ByTag<A> = <Tag extends TagsOf<A> & string>(t: Tag) => (keys: KeysDefinition<A, Tag>) => ADT<A, Tag>

interface TypeDef<T> {
  _TD: T
}
type TypeOfDef<X extends TypeDef<any>> = X['_TD']

export const ofType = <T>(): TypeDef<T> => 1 as any
export const makeADT = <Tag extends string>(tag: Tag) => <R extends { [x in keyof R]: TypeDef<{ [t in Tag]: x }> }>(
  _keys: R
): ADT<TypeOfDef<R[keyof R]>, Tag> => {
  type Tag = typeof tag
  type A = TypeOfDef<R[keyof R]>
  const keys: any = _keys // any

  const ctors = CU.Ctors<A, Tag>(tag)(keys)
  const predicates = PU.Predicates<A, any>(tag)(keys) // any
  const monocles = M.MonocleFor<A>()
  const matchers = Ma.Matchers<A, any>(tag)(keys) // any
  const select = <Keys extends (A[Tag] & string)[]>(
    ...selectedKeys: Keys
  ): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag> => makeADT(tag)(keepKeys(keys, selectedKeys) as any)

  const exclude = <Keys extends (A[Tag] & string)[]>(
    ...excludedKeys: Keys
  ): ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag> => makeADT(tag)(excludeKeys(keys, excludedKeys) as any)

  const res: ADT<A, Tag> = {
    ...ctors,
    ...predicates,
    ...monocles,
    ...matchers,
    tag,
    keys,
    select,
    exclude
  }
  return res
}
