import { Materialized, Morph } from './materializer'
import { record, array } from 'fp-ts'
import { HKT2 } from '@morphic-ts/common/lib/HKT'
import { assignCallable, wrapFun, InhabitedTypes, AType, EType } from './utils'
import { Algebra } from '@morphic-ts/algebras/lib/hkt'
import { InterpreterURI } from './InterpreterResult'
import { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { ProgramURI, ProgramType } from './ProgramType'
import { ADT, makeADT } from '@morphic-ts/adt/lib/index'
import { ElemType } from '@morphic-ts/adt/lib/utils'
import { identity, tuple } from 'fp-ts/lib/function'
import { intersection, difference } from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? string extends T
    ? IfString
    : IfLiteral
  : IfNotString

/**
 *  @since 0.0.1
 */
export type TaggedUnionProg<R, E, A, ProgURI extends ProgramURI> = ProgramType<R, E, A>[ProgURI] &
  (<G>(a: Algebra<G, R>[TaggedUnionsURI]) => HKT2<G, R, E, A>)

type M<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Materialized<
  R,
  E,
  A,
  ProgURI,
  InterpURI
>

type AnyTypes = Record<string, InhabitedTypes<any, any, any>>

/**
 *  @since 0.0.1
 */
export type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> = {
  [k in keyof Types]: M<R, EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}

type AnyM<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R> = M<R, any, any, ProgURI, InterpURI>

const recordFromArray = record.fromFoldable({ concat: identity }, array.array)
const keepKeys = (a: Record<string, any>, toKeep: Array<string>): object =>
  recordFromArray(intersection(eqString)(Object.keys(a), toKeep).map((k: string) => tuple(k, a[k])))

const excludeKeys = (a: Record<string, any>, toExclude: Array<string>): object =>
  recordFromArray(difference(eqString)(Object.keys(a), toExclude).map((k: string) => tuple(k, a[k])))

export type TaggedBuilder<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R> = <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI, R>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<any, infer E, infer A> ? [E, A] : never
  },
  Tag,
  ProgURI,
  InterpURI,
  R
>

/**
 *  @since 0.0.1
 */
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R>(
  summ: <E, A>(F: TaggedUnionProg<R, E, A, ProgURI>) => M<R, E, A, ProgURI, InterpURI>
): TaggedBuilder<ProgURI, InterpURI, R>
/**
 *  @since 0.0.1
 */
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R>(
  summ: <E, A>(F: TaggedUnionProg<R, E, A, ProgURI>) => M<R, E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI, R>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<any, infer E, infer A> ? [E, A] : never
  },
  Tag,
  ProgURI,
  InterpURI,
  R
> {
  return tag => o => {
    // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
    // const summoned:  M<EParam<Types>, AParam<Types>, ProgURI, InterpURI> = summ<EParam<Types>, AParam<Types>>((F: any) =>

    const summoned = summ(
      (F: any) => F.taggedUnion(tag, record.mapWithIndex((_k, v: AnyM<ProgURI, InterpURI, R>) => (v as any)(F))(o)) // FIXME: resolve any
    ) // Trust
    const adt = makeADT(tag)(o as any)

    const preTagged = makeTagged(summ)(tag)

    const selectMorph = (selectedKeys: string[]) => preTagged(keepKeys(o, selectedKeys as string[]))
    const excludeMorph = (selectedKeys: string[]) => preTagged(excludeKeys(o, selectedKeys as string[]))

    const res = assignCallable(wrapFun(summoned as any), {
      // FIXME: as any
      ...summoned,
      ...adt,
      selectMorph,
      excludeMorph
    })

    return res
  }
}

/**
 *  @since 0.0.1
 */
type AnyADTTypes = {
  [k in keyof AnyTypes]: [any, any]
}

/**
 *  @since 0.0.1
 */
export type EOfTypes<Types extends AnyADTTypes> = Types[keyof Types][0]

/**
 *  @since 0.0.1
 */
export type AOfTypes<Types extends AnyADTTypes> = Types[keyof Types][1]

/**
 * Extracts the type of `A` for a given Morph type
 */
/**
 *  @since 0.0.1
 */
export type AOfMorhpADT<T extends HasTypes<any>> = AOfTypes<T['_Types']>

/**
 * Extracts the type of `E` for a given Morph type
 */
/**
 *  @since 0.0.1
 */
export type EOfMorhpADT<T extends HasTypes<any>> = EOfTypes<T['_Types']>

/**
 *  @since 0.0.1
 */
export type MorphADT<
  Types extends AnyADTTypes,
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> = HasTypes<Types> &
  ADT<AOfTypes<Types>, Tag> &
  Morph<R, EOfTypes<Types>, AOfTypes<Types>, InterpURI, ProgURI> &
  Refinable<Types, Tag, ProgURI, InterpURI, R>

/**
 *  @since 0.0.1
 */
interface HasTypes<Types extends AnyADTTypes> {
  _Types: Types
}

export interface Refinable<
  Types extends AnyADTTypes,
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> {
  selectMorph: <Keys extends (keyof Types)[]>(
    keys: Keys
  ) => MorphADT<
    {
      [k in Extract<keyof Types, ElemType<Keys>>]: Types[k]
    },
    Tag,
    ProgURI,
    InterpURI,
    R
  >
  excludeMorph: <Keys extends (keyof Types)[]>(
    keys: Keys
  ) => MorphADT<
    {
      [k in Exclude<keyof Types, ElemType<Keys>>]: Types[k]
    },
    Tag,
    ProgURI,
    InterpURI,
    R
  >
}
