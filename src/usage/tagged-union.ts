import {
  EType,
  AType,
  InhabitedTypes,
  MorphADT1,
  MorphADT2,
  Materialized2,
  Materialized1,
  Materialized,
  MorphADT,
  TaggableAsADT
} from './materializer'
import { record } from 'fp-ts'
import { HKT2 } from '../HKT'
import { TagsOf } from '../common'
import { Program, ProgramURI, Program1URI, Program2URI } from './programs-hkt'
import { Algebra } from '../algebras/hkt'
import { InterpreterURI, Interpreter1URI, Interpreter2URI } from './interpreters-hkt'

type TaggedUnionProg1<E, A, ProgURI extends Program1URI> = Program<E, A>[ProgURI] &
  (<G>(a: Algebra<G>['TaggedUnions']) => HKT2<G, E, A>)
type TaggedUnionProg2<E, A, ProgURI extends Program2URI> = Program<E, A>[ProgURI] &
  (<G>(a: Algebra<G>['TaggedUnions']) => HKT2<G, E, A>)
type TaggedUnionProg<E, A, ProgURI extends ProgramURI> = Program<E, A>[ProgURI] &
  (<G>(a: Algebra<G>['TaggedUnions']) => HKT2<G, E, A>)

type M1<E, A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = Materialized1<E, A, ProgURI, InterpURI>
type M2<E, A, ProgURI extends Program2URI, InterpURI extends Interpreter2URI> = Materialized2<E, A, ProgURI, InterpURI>
type M<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Materialized<E, A, ProgURI, InterpURI>

type AnyTypes = Record<string, InhabitedTypes<any, any>>
type TagType<Types extends AnyTypes> = TagsOf<AType<Types[keyof Types]>> & string

type AParam<Types extends AnyTypes> = {
  [k in keyof Types]: AType<Types[k]>
}[keyof Types]

type UnionTypes1<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends Program1URI,
  InterpURI extends Interpreter1URI
> = {
  [k in keyof Types]: M1<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}
type UnionTypes2<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends Program2URI,
  InterpURI extends Interpreter2URI
> = {
  [k in keyof Types]: M2<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}
type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = {
  [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}

type AnyM<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = M<any, any, ProgURI, InterpURI>

export function makeTagged<ProgURI extends Program1URI, InterpURI extends Interpreter1URI>(
  summ: <A>(F: TaggedUnionProg1<unknown, A, ProgURI>) => M1<unknown, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes1<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT1<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI>
export function makeTagged<ProgURI extends Program2URI, InterpURI extends Interpreter2URI>(
  summ: <A>(F: TaggedUnionProg2<unknown, A, ProgURI>) => M2<unknown, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes2<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT2<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI>
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <A>(F: TaggedUnionProg<unknown, A, ProgURI>) => M<unknown, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI> {
  return <Tag extends string>(tag: Tag) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
    o: Types
  ): MorphADT<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI> => {
    // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
    const summoned = summ<AParam<Types>>(
      (F: any) => F.taggedUnion(tag, record.mapWithIndex((k, v: AnyM<ProgURI, InterpURI>) => (v as any)(F))(o)) // Trust
    )
    return (summoned as TaggableAsADT<unknown, AParam<Types>, ProgURI, InterpURI>).tagged<TagType<Types>>(
      tag as typeof tag & TagType<Types>
    )(o as any) // We're bending reality as bit
  }
}
