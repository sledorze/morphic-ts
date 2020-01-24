import { InferredProgram } from './programs-infer'
import {
  materialize,
  Materialized,
  ProgramInterpreter,
  InterpreterURIOfProgramInterpreter,
  ProgramURIOfProgramInterpreter
} from './materializer'
import { InterpreterURI } from './InterpreterResult'
import { CacheType } from '../common/core'
import { ProgramURI, ProgramTypes, ProgramType } from './ProgramType'

export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  summonAs: <L, A>(F: InferredProgram<L, A, ProgURI>) => Materialized<L, A, ProgURI, InterpURI>
  summonAsA: <A>() => <L>(F: InferredProgram<L, A, ProgURI>) => Materialized<L, A, ProgURI, InterpURI>
  summonAsL: <L>() => <A>(F: InferredProgram<L, A, ProgURI>) => Materialized<L, A, ProgURI, InterpURI>
  summon: <A>(F: InferredProgram<unknown, A, ProgURI>) => Materialized<unknown, A, ProgURI, InterpURI>
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
  type UM<A> = Materialized<unknown, A, ProgURI, InterpURI>

  const summonAs = <L, A>(F: P<L, A>): M<L, A> => materialize(cacheProgramEval(F), programInterpreter)

  const summonAsA: <A>() => <L>(F: P<L, A>) => M<L, A> = () => summonAs
  const summonAsL: <L>() => <A>(F: P<L, A>) => M<L, A> = () => summonAs
  const summon: <A>(F: P<unknown, A>) => UM<A> = summonAs

  return {
    summonAs,
    summonAsA,
    summonAsL,
    summon
  } as any
}

export function makeSummoner<PI extends ProgramInterpreter<any, any>>(
  cacheProgramEval: CacheType,
  programInterpreter: PI
) {
  return makeSummonerInternal<ProgramURIOfProgramInterpreter<PI>, InterpreterURIOfProgramInterpreter<PI>>(
    cacheProgramEval,
    programInterpreter
  )
}
