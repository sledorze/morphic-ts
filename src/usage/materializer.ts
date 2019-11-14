import { ProgramsURI, Programs, Program } from './programs-hkt'
import { InterpretersURI, Interpreters } from './interpreters-hkt'
import { BuilderType } from '../interpreters/builder'
import { assignFunction, TagsOf } from '../common'
import { ADT, adtByTag, KeysDefinition } from '../adt'
import { MonocleFor } from '../adt/monocle'

interface WithProgram<E, A, ProgURI extends ProgramsURI> {
  program: Programs<E, A>[ProgURI]
}

export type ProgramInterpreter<ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = <E, A>(
  program: Programs<E, A>[ProgURI]
) => BuilderType<A> & Interpreters<E, A>[InterpURI]

type BuilderAndMorphes<E, A, InterpURI extends InterpretersURI> = BuilderType<A> & Interpreters<E, A>[InterpURI]

const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D =>
  assignFunction((...args: any) => F(...args), Object.assign({}, F, d))

function interpreteWithProgram<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  program: Program<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): BuilderAndMorphes<E, A, InterpURI> & Programs<E, A>[ProgURI] {
  return assignFunction(
    (...args: any) => (program as any)(...args),
    programInterpreter(program as Programs<E, A>[ProgURI])
  ) // this `as` is the White lie to escape complexes types
}
export type ADTExt<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends ProgramsURI,
  InterpURI extends InterpretersURI
> = BuilderAndMorphes<E, A, InterpURI> & ADT<A, Tag> & WithProgram<E, A, ProgURI>

interface TaggableAsADT<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => ADTExt<E, A, Tag, ProgURI, InterpURI>
}

export type Materialized_<A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = Materialized<
  unknown,
  A,
  ProgURI,
  InterpURI
>

export type Materialized<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = BuilderAndMorphes<
  E,
  A,
  InterpURI
> &
  Program<E, A>[ProgURI] &
  MonocleFor<A> &
  TaggableAsADT<E, A, ProgURI, InterpURI> &
  InhabitedTypes<E, A>

export interface InhabitedTypes<E, A> {
  // tslint:disable-next-line: no-unused-expression
  _E: E
  // tslint:disable-next-line: no-unused-expression
  _A: A
}
export type AType<X extends InhabitedTypes<any, any>> = X['_A']
export type EType<X extends InhabitedTypes<any, any>> = X['_E']
export type ProgramURIOf<X extends Materialized<any, any, any, any>> = X extends Materialized<any, any, infer URI, any>
  ? URI
  : any

export function materialize<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  program: Program<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<E, A, ProgURI, InterpURI> {
  return withTaggableAndMonocle(interpreteWithProgram(program, programInterpreter))
}

/**
 * Expose tagged functions in addition to the type derived facilities
 */
function asADT<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  m: Materialized<E, A, ProgURI, InterpURI>
): <Tag extends TagsOf<A> & string>(
  tag: Tag
) => (keys: KeysDefinition<A, Tag>) => ADTExt<E, A, Tag, ProgURI, InterpURI> {
  return tag => keys =>
    assignCallable(adtByTag<A>()(tag)(keys), {
      ...m,
      program: (a: any) => (m as any)(a) // we cannot proove here that the `ProgURI` will index `Materialized` on a function call - via `Program<E, A>[ProgURI]`
    })
}

function withTaggableAndMonocle<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  morphes: BuilderAndMorphes<E, A, InterpURI> & Programs<E, A>[ProgURI]
): Materialized<E, A, ProgURI, InterpURI> {
  const tagged = <Tag extends TagsOf<A> & string>(tag: Tag) => (
    keys: KeysDefinition<A, Tag>
  ): ADTExt<E, A, Tag, ProgURI, InterpURI> => asADT(res)(tag)(keys)

  const res: Materialized<E, A, ProgURI, InterpURI> = assignCallable(morphes as typeof morphes & InhabitedTypes<E, A>, {
    tagged,
    ...MonocleFor<A>()
  })

  return res
}
