import { InterpreterResult, InterpreterURI } from './InterpreterResult'
import { assignFunction, wrapFun, assignCallable, InhabitedTypes, inhabitTypes } from './utils'
import { MonocleFor } from '../adt/monocle'
import { ProgramURI, ProgramType } from './ProgramType'

export interface ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <E, A>(program: ProgramType<E, A>[ProgURI]): InterpreterResult<E, A>[InterpURI]
}
export type ProgramURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  infer P,
  any
>
  ? P
  : never

export type InterpreterURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  any,
  infer R
>
  ? R
  : never

export type Morph<E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = InterpreterResult<
  E,
  A
>[InterpURI] &
  ProgramType<E, A>[ProgURI]

function interpreteWithProgram<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A> {
  return inhabitTypes(assignFunction(wrapFun(program), programInterpreter(program)))
}

export type Materialized<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  InhabitedTypes<E, A>

export function materialize<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<E, A, ProgURI, InterpURI> {
  return withMonocle(interpreteWithProgram(program, programInterpreter))
}

/**
 * Expose tagged functions in addition to the type derived facilities
 */

function withMonocle<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  morph: Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A>
): Materialized<E, A, ProgURI, InterpURI> {
  return assignCallable(morph, MonocleFor<A>())
}
