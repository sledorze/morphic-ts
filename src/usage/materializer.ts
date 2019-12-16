import { Program, Program1, Program1URI, Program2URI, Program2, ProgramURI } from './programs-hkt'
import {
  Interpreter1URI,
  Interpreter2URI,
  Interpreter1,
  Interpreter2,
  Interpreter,
  InterpreterURI
} from './interpreters-hkt'
import { BuilderType } from '../interpreters/builder'
import { assignFunction, TagsOf } from '../common'
import { ADT, KeysDefinition, makeADT } from '../adt'
import { MonocleFor } from '../adt/monocle'

export type ProgramInterpreter1<ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = <E, A>(
  program: Program1<E, A>[ProgURI]
) => Interpreter1<E, A>[InterpURI]

export type ProgramInterpreter2<ProgURI extends Program2URI, InterpURI extends Interpreter2URI> = <E, A>(
  program: Program2<E, A>[ProgURI]
) => Interpreter2<E, A>[InterpURI]

export type ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = <E, A>(
  program: Program<E, A>[ProgURI]
) => Interpreter<E, A>[InterpURI]

type Morph1<E, A, InterpURI extends Interpreter1URI, ProgURI extends Program1URI> = BuilderType<A> &
  Interpreter1<E, A>[InterpURI] &
  Program<E, A>[ProgURI]

type Morph2<E, A, InterpURI extends Interpreter2URI, ProgURI extends Program2URI> = BuilderType<A> &
  Interpreter2<E, A>[InterpURI] &
  Program<E, A>[ProgURI]

type Morph<E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = BuilderType<A> &
  Interpreter<E, A>[InterpURI] &
  Program<E, A>[ProgURI]

const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D =>
  assignFunction(F, Object.assign({}, F, d))

const wrapFun = <A, B, X>(g: ((a: A) => B) & X): typeof g => ((x: any) => g(x)) as any

function interpreteWithProgram<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: Program<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A> {
  return inhabitTypes(assignFunction(wrapFun(program), programInterpreter(program)))
}

/**
 * Fake inhabitation of types
 */
const inhabitTypes = <E, A, T>(t: T): T & InhabitedTypes<E, A> => t as any

export type MorphADT1<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends Program1URI,
  InterpURI extends Interpreter1URI
> = ADT<A, Tag> & Morph1<E, A, InterpURI, ProgURI>

export type MorphADT2<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends Program2URI,
  InterpURI extends Interpreter2URI
> = ADT<A, Tag> & Morph2<E, A, InterpURI, ProgURI>

export type MorphADT<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = ADT<A, Tag> & Morph<E, A, InterpURI, ProgURI>

interface TaggableAsADT1<E, A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => MorphADT1<E, A, Tag, ProgURI, InterpURI>
}
interface TaggableAsADT2<E, A, ProgURI extends Program2URI, InterpURI extends Interpreter2URI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => MorphADT2<E, A, Tag, ProgURI, InterpURI>
}
export interface TaggableAsADT<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI>
}

export type Materialized1_<A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = Materialized1<
  unknown,
  A,
  ProgURI,
  InterpURI
>
export type Materialized2_<A, ProgURI extends Program2URI, InterpURI extends Interpreter2URI> = Materialized2<
  unknown,
  A,
  ProgURI,
  InterpURI
>

// export type Materialized1<E, A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = Morph1<
//   E,
//   A,
//   InterpURI,
//   ProgURI
// > &
//   MonocleFor<A> &
//   TaggableAsADT1<E, A, ProgURI, InterpURI> &
//   InhabitedTypes<E, A>

export type Materialized1<E, A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI> = Morph1<
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  TaggableAsADT1<E, A, ProgURI, InterpURI> &
  InhabitedTypes<E, A>

export type Materialized2<E, A, ProgURI extends Program2URI, InterpURI extends Interpreter2URI> = Morph2<
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  TaggableAsADT2<E, A, ProgURI, InterpURI> &
  InhabitedTypes<E, A>

export type Materialized<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
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
export type ProgramURIOf<
  X extends Materialized1<any, any, any, never> | Materialized2<any, any, any, never>
> = X extends Materialized1<any, any, infer URI, never>
  ? URI
  : X extends Materialized2<any, any, infer URI, never>
  ? URI
  : any

export function materialize<E, A, ProgURI extends Program1URI, InterpURI extends Interpreter1URI>(
  program: Program1<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter1<ProgURI, InterpURI>
): Materialized1<E, A, ProgURI, InterpURI>
export function materialize<E, A, ProgURI extends Program2URI, InterpURI extends Interpreter2URI>(
  program: Program2<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter2<ProgURI, InterpURI>
): Materialized2<E, A, ProgURI, InterpURI>
export function materialize<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: Program<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<E, A, ProgURI, InterpURI> {
  return withTaggableAndMonocle(interpreteWithProgram(program, programInterpreter))
}

/**
 * Expose tagged functions in addition to the type derived facilities
 */
function asADT<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  m: Morph<E, A, InterpURI, ProgURI>
): <Tag extends TagsOf<A> & string>(
  tag: Tag
) => (keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI> {
  return tag => keys =>
    assignCallable(wrapFun(m), {
      ...m,
      ...makeADT(tag)(keys)
    })
}

function withTaggableAndMonocle<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  morphes: Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A>
): Materialized<E, A, ProgURI, InterpURI> {
  const tagged = <Tag extends TagsOf<A> & string>(tag: Tag) => (keys: KeysDefinition<A, Tag>) =>
    asADT(res as Morph<E, A, InterpURI, ProgURI>)(tag)(keys)
  const res: Materialized<E, A, ProgURI, InterpURI> = assignCallable(morphes, {
    tagged,
    ...MonocleFor<A>()
  })
  return res
}
