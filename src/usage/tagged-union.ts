import { EType, AType, Materialized, ADTExt, InhabitedTypes } from '../../src/usage/materializer'
import { record } from 'fp-ts'
import { HKT2 } from '../../src/HKT'
import { TagsOf } from '../../src/common'
import { Program, ProgramsURI } from '../../src/usage/programs-hkt'
import { Algebra } from '../../src/algebras/hkt'
import { InterpretersURI } from '../../src/usage/interpreters-hkt'

type TaggedUnionProg<E, A, ProgURI extends ProgramsURI> = Program<E, A>[ProgURI] &
  (<G>(a: Algebra<G>['TaggedUnions']) => HKT2<G, E, A>)

type M<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = Materialized<
  E,
  A,
  ProgURI,
  InterpURI
>
type AnyM<ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = M<
  any,
  any,
  ProgURI,
  InterpURI
>

type AnyTypes = Record<string, InhabitedTypes<any, any>>
type TagType<Types extends AnyTypes> = TagsOf<AType<Types[keyof Types]>> & string

type AParam<Types extends AnyTypes> = {
  [k in keyof Types]: AType<Types[k]>
}[keyof Types]

export const makeTagged = <ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  summ: <A>(F: TaggedUnionProg<unknown, A, ProgURI>) => M<unknown, A, ProgURI, InterpURI>
) => <Tag extends string>(tag: Tag) => <
  Types extends {
    [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
  }
>(
  o: Types
): ADTExt<unknown, AParam<Types>, TagType<Types>, ProgURI, InterpURI> => {
  // Trust the outer signature - type lookup via unknown URI cannot have any semantic here
  const summoned = summ<AParam<Types>>(
    (F: any) =>
      F.taggedUnion(tag, record.mapWithIndex((k, v: AnyM<ProgURI, InterpURI>) => (v as any)(F))(o)) // Trust
  )
  return summoned.tagged<TagType<Types>>(tag as typeof tag & TagType<Types>)(o as any) // We're bending reality as bit
}
