import { Program, Program1, Program1URI, Program2URI, Program2, ProgramURI } from './programs-hkt'
import { Interpreter1URI, Interpreter2URI, Interpreter1, Interpreter2, InterpreterURI } from './interpreters-hkt'
import { BuilderType } from '../interpreters/builder'
import { assignFunction, TagsOf } from '../common'
import { ADT, KeysDefinition, makeADT } from '../adt'
import { MonocleFor } from '../adt/monocle'

// export type ProgramInterpreterRaw<ProgURI extends ProgramsURI, InterpURI extends InterpreterURI> = <E, A>(
//   program: Programs<E, A>[ProgURI]
// ) => Interpreter<E, A>[InterpURI]

export type ProgramInterpreterRaw1<ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = <E, A>(
  program: Program1<E, A>[ProgURI]
) => Interpreter1<E, A>[InterpURI]

export type ProgramInterpreterRaw2<ProgURI extends Program2URI, InterpURI extends Interpreter2URI> = <E, A>(
  program: Program2<E, A>[ProgURI]
) => Interpreter2<E, A>[InterpURI]

// export type ProgramInterpreter<ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = <E, A>(
//   program: Programs<E, A>[ProgURI]
// ) => BuilderType<A> & Interpreters<E, A>[InterpURI]

type Morph<E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = BuilderType<A> &
  Interpreters<E, A>[InterpURI] &
  Program<ProgURI, E, A>[ProgURI]

const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D =>
  assignFunction((...args: any) => F(...args), Object.assign({}, F, d))

function interpreteWithProgram<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  program: Program<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Morph<E, A, InterpURI, ProgURI> {
  return assignFunction(
    (...args: any) => (program as any)(...args), // TODO: simplify
    programInterpreter(program as Programs<E, A>[ProgURI]) // this `as` is the White lie to interprete the program with the correct kind
  )
}
export type MorphADT<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends ProgramsURI,
  InterpURI extends InterpretersURI
> = ADT<A, Tag> & Morph<E, A, InterpURI, ProgURI>

interface TaggableAsADT<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI>
}

export type Materialized_<A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = Materialized<
  unknown,
  A,
  ProgURI,
  InterpURI
>

export type Materialized<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI> = Morph<
  E,
  A,
  InterpURI,
  ProgURI
> &
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
  m: Morph<E, A, InterpURI, ProgURI>
): <Tag extends TagsOf<A> & string>(
  tag: Tag
) => (keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI> {
  return tag => keys =>
    assignCallable((algebra: any) => (m as any)(algebra), {
      ...m,
      ...makeADT(tag)(keys)
    })
}

function withTaggableAndMonocle<E, A, ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  morphes: Morph<E, A, InterpURI, ProgURI>
): Materialized<E, A, ProgURI, InterpURI> {
  const tagged = <Tag extends TagsOf<A> & string>(tag: Tag) => (keys: KeysDefinition<A, Tag>) =>
    asADT<E, A, ProgURI, InterpURI>(res)(tag)(keys)
  const res: Materialized<E, A, ProgURI, InterpURI> = assignCallable(morphes as typeof morphes & InhabitedTypes<E, A>, {
    tagged,
    ...MonocleFor<A>()
  })
  return res
}
