import { InterpreterResult, InterpreterURI } from './InterpreterResult'
import { assignFunction, wrapFun, assignCallable, InhabitedTypes, inhabitTypes } from './utils'
import { MonocleFor } from '@morphic-ts/adt/lib/monocle'
import { ProgramURI, ProgramType } from './ProgramType'
import { interpretable, Overloads } from './programs-infer'

/**
 *  @since 0.0.1
 */
export interface ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <R, E, A>(program: ProgramType<R, E, A>[ProgURI]): InterpreterResult<E, A>[InterpURI]
}
/**
 *  @since 0.0.1
 */
export type ProgramURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  infer P,
  any
>
  ? P
  : never

/**
 *  @since 0.0.1
 */
export type InterpreterURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  any,
  infer R
>
  ? R
  : never

/**
 *  @since 0.0.1
 */
export type Morph<R, E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = InterpreterResult<
  E,
  A
>[InterpURI] &
  ProgramType<R, E, A>[ProgURI] &
  InhabitedInterpreterAndAlbegra<ProgURI, InterpURI>

const inhabitInterpreterAndAlbegra = <ProgURI extends ProgramURI, InterpURI extends InterpreterURI, T>(
  t: T
): T & InhabitedInterpreterAndAlbegra<ProgURI, InterpURI> => t as T & InhabitedInterpreterAndAlbegra<ProgURI, InterpURI>

export interface InhabitedInterpreterAndAlbegra<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  _P: ProgURI
  _I: InterpURI
}

function interpreteWithProgram<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<R, E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Morph<R, E, A, InterpURI, ProgURI> & InhabitedTypes<R, E, A> {
  return inhabitInterpreterAndAlbegra(
    inhabitTypes(assignFunction(wrapFun(program as any), programInterpreter(program)))
  ) // FIXME: resolve any
}

interface Interpretable<R, E, A, ProgURI extends ProgramURI> {
  derive: Overloads<ProgramType<R, E, A>[ProgURI]>
}

/**
 *  @since 0.0.1
 */
export type Materialized<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
  R,
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  InhabitedTypes<R, E, A> &
  InhabitedInterpreterAndAlbegra<ProgURI, InterpURI> &
  Interpretable<R, E, A, ProgURI>

/**
 *  @since 0.0.1
 */
export function materialize<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<R, E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<R, E, A, ProgURI, InterpURI> {
  const morph = interpreteWithProgram(program, programInterpreter)
  return assignCallable(morph as any, {
    ...MonocleFor<A>(),
    derive: interpretable(morph as any)
  }) // FIXME: resolve any
}
