import { EType, AType, InhabitedTypes, Materialized, MorphADT, TaggableAsADT } from './materializer'
import { record } from 'fp-ts'
import { HKT2 } from '../common/HKT'
import { TagsOf } from './utils'
import { ProgramType, ProgramURI } from './programs-hkt'
import { Algebra } from '../algebras/hkt'
import { InterpreterURI } from './interpreters-hkt'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'

type TaggedUnionProg<E, A, ProgURI extends ProgramURI> = ProgramType<E, A>[ProgURI] &
  (<G>(a: Algebra<G>[TaggedUnionsURI]) => HKT2<G, E, A>)

type M<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Materialized<E, A, ProgURI, InterpURI>

type AnyTypes = Record<string, InhabitedTypes<any, any>>
type TagType<Types extends AnyTypes> = TagsOf<AType<Types[keyof Types]>> & string

type AParam<Types extends AnyTypes> = {
  [k in keyof Types]: AType<Types[k]>
}[keyof Types]

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
