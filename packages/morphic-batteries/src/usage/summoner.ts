import { InferredProgram } from './programs-infer'
import {
  materialize,
  Materialized,
  ProgramInterpreter,
  InterpreterURIOfProgramInterpreter,
  ProgramURIOfProgramInterpreter
} from './materializer'
import { InterpreterURI } from './InterpreterResult'
import { CacheType } from 'morphic-common/lib/core'
import { ProgramURI, ProgramTypes, ProgramType } from './ProgramType'

/**
 *  @since 0.0.1
 */
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <L, A>(F: InferredProgram<L, A, ProgURI>): Materialized<L, A, ProgURI, InterpURI>
}

/**
 * - Cache application of the given interpreter
 * - Returns summoners giving the ability to constraint type parameters
 * - Returns the interpreter extended with matchers, monocle definitions, etc..
 */
function makeSummonerInternal<
  ProgURI extends ProgramURI,
  InterpURI extends keyof ProgramTypes[ProgURI] & InterpreterURI
>(
  cacheProgramEval: CacheType,
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Summoners<ProgURI, InterpURI> {
  type P<L, A> = ProgramType<L, A>[ProgURI]
  type M<L, A> = Materialized<L, A, ProgURI, InterpURI>

  const summon = <L, A>(F: P<L, A>): M<L, A> => materialize(cacheProgramEval(F), programInterpreter)
  return summon as any
}

/**
 *  @since 0.0.1
 */
export function makeSummoner<PI extends ProgramInterpreter<any, any>>(
  cacheProgramEval: CacheType,
  programInterpreter: PI
) {
  return makeSummonerInternal<ProgramURIOfProgramInterpreter<PI>, InterpreterURIOfProgramInterpreter<PI>>(
    cacheProgramEval,
    programInterpreter
  )
}
