import { EType, AType, InhabitedTypes, Materialized, MorphADT, TaggableAsADT, Morph } from './materializer'
import { record } from 'fp-ts'
import { HKT2 } from '../common/HKT'
import { TagsOf } from './utils'
import { Algebra } from '../algebras/hkt'
import { InterpreterURI } from './InterpreterResult'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'
import { ProgramURI, ProgramType } from './ProgramType'
import { ADT } from '../adt'

type TaggedUnionProg<E, A, ProgURI extends ProgramURI> = ProgramType<E, A>[ProgURI] &
  (<G>(a: Algebra<G>[TaggedUnionsURI]) => HKT2<G, E, A>)

type M<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Materialized<E, A, ProgURI, InterpURI>

type AnyTypes = Record<string, InhabitedTypes<any, any>>
type TagType<Types extends AnyTypes> = TagsOf<AType<Types[keyof Types]>> & string

type AParam<Types extends AnyTypes> = AType<Types[keyof Types]>
type EParam<Types extends AnyTypes> = EType<Types[keyof Types]>

type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = {
  [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}

type AnyM<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = M<any, any, ProgURI, InterpURI>

export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<EParam<Types>, AParam<Types>, TagType<Types>, ProgURI, InterpURI>
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <A>(F: TaggedUnionProg<unknown, A, ProgURI>) => M<unknown, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI>
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<EParam<Types>, AParam<Types>, TagType<Types>, ProgURI, InterpURI> {
  return <Tag extends string>(tag: Tag) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
    o: Types
  ): MorphADT<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI> => {
    // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
    const summoned = summ<EParam<Types>, AParam<Types>>((F: any) =>
      F.taggedUnion(tag, record.mapWithIndex((_k, v: AnyM<ProgURI, InterpURI>) => (v as any)(F))(o))
    ) // Trust
    return (summoned as TaggableAsADT<unknown, AParam<Types>, ProgURI, InterpURI>).tagged<TagType<Types>>(
      tag as typeof tag & TagType<Types>
    )(o as any) // We're bending reality as bit
  }
}

export type MorphADT2<
  Types extends Record<string, InhabitedTypes<any, any>>,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = ADT<AParam<Types>, TagType<Types>> & Morph<EParam<Types>, AParam<Types>, InterpURI, ProgURI> & { types: Types }

export function makeTagged2<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(o: Types) => MorphADT2<Types, ProgURI, InterpURI>
export function makeTagged2<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <A>(F: TaggedUnionProg<unknown, A, ProgURI>) => M<unknown, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(o: Types) => MorphADT2<Types, ProgURI, InterpURI>
export function makeTagged2<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(o: Types) => MorphADT2<Types, ProgURI, InterpURI> {
  return <Tag extends string>(tag: Tag) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
    o: Types
  ): MorphADT2<Types, ProgURI, InterpURI> => {
    // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
    const summoned = summ<EParam<Types>, AParam<Types>>((F: any) =>
      F.taggedUnion(tag, record.mapWithIndex((_k, v: AnyM<ProgURI, InterpURI>) => (v as any)(F))(o))
    ) // Trust
    return (summoned as TaggableAsADT<unknown, AParam<Types>, ProgURI, InterpURI>).tagged<TagType<Types>>(
      tag as typeof tag & TagType<Types>
    )(o as any) // We're bending reality as bit
  }
}
