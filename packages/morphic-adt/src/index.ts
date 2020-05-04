import { ElemType, ExtractUnion, ExcludeUnion } from './utils'
import * as M from './monocle'
import * as Ma from './matcher'
import * as PU from './predicates'
import * as CU from './ctors'
import { intersection, difference } from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import { record, array } from 'fp-ts'
import { tuple, identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export type Tagged<Tag extends string> = { [t in Tag]: string }

/**
 *  @since 0.0.1
 */
export interface ADT<A, Tag extends keyof A & string>
  extends Ma.Matchers<A, Tag>,
    PU.Predicates<A, Tag>,
    CtorsWithKeys<A, Tag>,
    M.MonocleFor<A> {
  select: <Keys extends A[Tag][]>(keys: Keys) => ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag>
  exclude: <Keys extends A[Tag][]>(keys: Keys) => ADT<ExcludeUnion<A, Tag, ElemType<Keys>>, Tag>
}

interface CtorsWithKeys<A, Tag extends keyof A & string> extends CU.Ctors<A, Tag> {
  keys: KeysDefinition<A, Tag>
}

/**
 *  @since 0.0.1
 */
export type ADTType<A extends ADT<any, any>> = CU.CtorType<A>

const mergeKeys = <A extends Tagged<Tag>, B extends Tagged<Tag>, Tag extends string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<A | B, Tag> => ({ ...a, ...b } as any)

const recordFromArray = record.fromFoldable({ concat: identity }, array.array)
const toTupleNull = (k: string) => tuple(k, null)

const intersectKeys = <A extends Tagged<Tag>, B extends Tagged<Tag>, Tag extends string>(
  a: KeysDefinition<A, Tag>,
  b: KeysDefinition<B, Tag>
): KeysDefinition<Extract<A, B>, Tag> =>
  recordFromArray(intersection(eqString)(Object.keys(a), Object.keys(b)).map(toTupleNull)) as KeysDefinition<
    Extract<A, B>,
    Tag
  >

const excludeKeys = <A extends Tagged<Tag>, Tag extends string>(
  a: KeysDefinition<A, Tag>,
  toRemove: Array<string>
): object => recordFromArray(difference(eqString)(Object.keys(a), toRemove).map(toTupleNull))

const keepKeys = <A extends Tagged<Tag>, Tag extends string>(
  a: KeysDefinition<A, Tag>,
  toKeep: Array<string>
): object => recordFromArray(intersection(eqString)(Object.keys(a), toKeep).map(toTupleNull))

/**
 *  @since 0.0.1
 */
export const unionADT = <
  AS extends [CtorsWithKeys<any, any>, CtorsWithKeys<any, any>, ...Array<CtorsWithKeys<any, any>>]
>(
  as: AS
): ADT<CU.CtorType<AS[number]>, AS[number]['tag']> => {
  const newKeys = array.reduceRight(as[0].keys, (x: AS[number], y) => mergeKeys(x.keys, y))(as)
  return makeADT(as[0].tag)(newKeys)
}

/**
 *  @since 0.0.1
 */
export const intersectADT = <A extends Tagged<Tag>, B extends Tagged<Tag>, Tag extends string>(
  a: ADT<A, Tag>,
  b: ADT<B, Tag>
): ADT<Extract<A, B>, Tag> => makeADT(a.tag)(intersectKeys(a.keys, b.keys))

/**
 *  @since 0.0.1
 */
export type KeysDefinition<A, Tag extends keyof A> = {
  [k in A[Tag] & string]: any
}

/**
 *  @since 0.0.1
 */
export const isIn = <A, Tag extends keyof A>(keys: KeysDefinition<A, Tag>) => (k: string) => k in keys

interface TypeDef<T> {
  _TD: T
}
type TypeOfDef<X extends TypeDef<any>> = X['_TD']

/**
 *  @since 0.0.1
 */
export const ofType = <T>(): TypeDef<T> => 1 as any

/**
 *  @since 0.0.1
 */
export const makeADT = <Tag extends string>(tag: Tag) => <R extends { [x in keyof R]: TypeDef<{ [t in Tag]: x }> }>(
  _keys: R
): ADT<TypeOfDef<R[keyof R]>, Tag> => {
  type Tag = typeof tag
  type A = TypeOfDef<R[keyof R]>
  type B = A & Tagged<Tag>
  const keys = _keys as KeysDefinition<Tagged<Tag>, Tag> // any

  const ctors = CU.Ctors(tag)(keys)
  const predicates = PU.Predicates<A, Tag>(tag)(keys)
  const monocles = M.MonocleFor<A>()
  const matchers = Ma.Matchers<B, Tag>(tag)(keys)

  const select = <Keys extends A[Tag][]>(selectedKeys: Keys): ADT<ExtractUnion<A, Tag, ElemType<Keys>>, Tag> =>
    makeADT(tag)(keepKeys(keys, selectedKeys as string[]) as any)

  const exclude = <Keys extends B[Tag][]>(excludedKeys: Keys): ADT<ExcludeUnion<B, Tag, ElemType<Keys>>, Tag> =>
    makeADT(tag)(excludeKeys(keys, excludedKeys) as any)

  const res: ADT<B, Tag> = {
    ...ctors,
    ...predicates,
    ...monocles,
    ...matchers,
    tag,
    keys,
    select,
    exclude
  }
  return res as ADT<A, Tag>
}
