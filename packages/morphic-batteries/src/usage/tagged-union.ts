import { Materialized, Morph } from './materializer'
import { record, array } from 'fp-ts'
import { HKT2 } from '@sledorze/morphic-common/lib/HKT'
import { TagsOf, assignCallable, wrapFun, InhabitedTypes, AType, EType } from './utils'
import { Algebra } from '@sledorze/morphic-algebras/lib/hkt'
import { InterpreterURI } from './InterpreterResult'
import { TaggedUnionsURI } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { ProgramURI, ProgramType } from './ProgramType'
import { ADT, makeADT } from '@sledorze/morphic-adt/lib/index'
import { ElemType } from '@sledorze/morphic-adt/lib/utils'
import { identity, tuple } from 'fp-ts/lib/function'
import { intersection, difference } from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export type TaggedUnionProg<E, A, ProgURI extends ProgramURI> = ProgramType<E, A>[ProgURI] &
  (<G>(a: Algebra<G>[TaggedUnionsURI]) => HKT2<G, E, A>)

type M<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Materialized<E, A, ProgURI, InterpURI>

type AnyTypes = Record<string, InhabitedTypes<any, any>>
type TagType<Types extends AnyTypes> = TagsOf<AType<Types[keyof Types]>> & string

type AParam<Types extends AnyTypes> = AType<Types[keyof Types]>
type EParam<Types extends AnyTypes> = EType<Types[keyof Types]>

/**
 *  @since 0.0.1
 */
export type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = {
  [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}

type AnyM<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = M<any, any, ProgURI, InterpURI>

const recordFromArray = record.fromFoldable({ concat: identity }, array.array)
const keepKeys = (a: object, toKeep: Array<string>): object =>
  recordFromArray(intersection(eqString)(Object.keys(a), toKeep).map((k: string) => tuple(k, a[k])))

const excludeKeys = (a: object, toExclude: Array<string>): object =>
  recordFromArray(difference(eqString)(Object.keys(a), toExclude).map((k: string) => tuple(k, a[k])))

/**
 *  @since 0.0.1
 */
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
  },
  TagType<Types>,
  ProgURI,
  InterpURI
>
/**
 *  @since 0.0.1
 */
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
  },
  TagType<Types>,
  ProgURI,
  InterpURI
> {
  return <Tag extends string>(tag: Tag) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
    o: Types
  ): MorphADT<
    {
      [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
    },
    TagType<Types>,
    ProgURI,
    InterpURI
  > => {
    // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
    // const summoned:  M<EParam<Types>, AParam<Types>, ProgURI, InterpURI> = summ<EParam<Types>, AParam<Types>>((F: any) =>

    const summoned: Morph<EParam<Types>, AParam<Types>, InterpURI, ProgURI> = summ<EParam<Types>, AParam<Types>>(
      (F: any) => F.taggedUnion(tag, record.mapWithIndex((_k, v: AnyM<ProgURI, InterpURI>) => (v as any)(F))(o))
    ) // Trust
    const adt: ADT<AParam<Types>, keyof AParam<Types> & string> = makeADT((tag as any) as keyof AParam<Types> & string)(
      o as any
    )

    const preTagged = makeTagged(summ)(tag)

    const selectMorph = <Keys extends (keyof Types)[]>(
      selectedKeys: Keys
    ): MorphADT<
      {
        [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
      },
      Tag,
      ProgURI,
      InterpURI
    > => preTagged(keepKeys(o, (selectedKeys as any) as string[])) as any

    const excludeMorph = <Keys extends (keyof Types)[]>(
      selectedKeys: Keys
    ): MorphADT<
      {
        [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
      },
      Tag,
      ProgURI,
      InterpURI
    > => preTagged(excludeKeys(o, (selectedKeys as any) as string[])) as any

    const res: MorphADT<
      {
        [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
      },
      TagType<Types>,
      ProgURI,
      InterpURI
    > = assignCallable(wrapFun(summoned), {
      ...summoned,
      ...adt,
      selectMorph,
      excludeMorph
    }) as any

    return res
  }
}

// Patterns

// type ExtractTypes<T extends UnionTypes<any, any, any, any>> = {
//   [k in keyof T]: T[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
// }

// type Select<Types extends { [k in keyof Types]: any }, Keys extends keyof Types> = {
//   [k in Extract<keyof Types, Keys>]: Types[k]
// }

/**
 *  @since 0.0.1
 */
export type EOfTypes<
  Types extends {
    [k in keyof Types]: [any, any]
  }
> = Types[keyof Types][0]

/**
 *  @since 0.0.1
 */
export type AOfTypes<
  Types extends {
    [k in keyof Types]: [any, any]
  }
> = Types[keyof Types][1]

/**
 * Extracts the type of `A` for a given Morph type
 */
/**
 *  @since 0.0.1
 */
export type AOfMorhpADT<T extends MorphADT<any, any, any, any>> = T extends MorphADT<
  infer Types,
  infer _T,
  infer _P,
  infer _I
>
  ? AOfTypes<Types>
  : never

/**
 * Extracts the type of `E` for a given Morph type
 */
/**
 *  @since 0.0.1
 */
export type EOfMorhpADT<T extends MorphADT<any, any, any, any>> = T extends MorphADT<
  infer Types,
  infer _T,
  infer _P,
  infer _I
>
  ? EOfTypes<Types>
  : never

/**
 *  @since 0.0.1
 */
export type MorphADT<
  Types extends { [k in keyof Types]: [any, any] },
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = ADT<AOfTypes<Types>, Tag> &
  Morph<EOfTypes<Types>, AOfTypes<Types>, InterpURI, ProgURI> & {
    selectMorph: <Keys extends (keyof Types)[]>(
      keys: Keys
    ) => MorphADT<
      {
        [k in Extract<keyof Types, ElemType<Keys>>]: Types[k]
      },
      Tag,
      ProgURI,
      InterpURI
    >
    excludeMorph: <Keys extends (keyof Types)[]>(
      keys: Keys
    ) => MorphADT<
      {
        [k in Exclude<keyof Types, ElemType<Keys>>]: Types[k]
      },
      Tag,
      ProgURI,
      InterpURI
    >
  }
