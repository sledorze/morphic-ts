import { InferredProgram, overloadsSymb } from './programs-infer'
import {
  materialize,
  Materialized,
  ProgramInterpreter,
  InterpreterURIOfProgramInterpreter,
  ProgramURIOfProgramInterpreter
} from './materializer'
import { InterpreterURI, InterpreterResult } from './InterpreterResult'
import { CacheType } from '@morphic-ts/common/lib/core'
import { ProgramURI, ProgramTypes, ProgramType } from './ProgramType'
import { makeTagged, TaggedBuilder } from './tagged-union'

/**
 *  @since 0.0.1
 */
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <L, A>(F: InferredProgram<L, A, ProgURI>): Materialized<L, A, ProgURI, InterpURI>
  _P: ProgURI
  _I: InterpURI
}
export type SummonerProgURI<X extends Summoners<any, any>> = NonNullable<X['_P']>
export type SummonerInterpURI<X extends Summoners<any, any>> = NonNullable<X['_I']>

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

export function defineSummoner<S extends Summoners<any, any> = never>(
  cacheProgramEval: CacheType,
  programInterpreter: <E, A>(
    program: NonNullable<ProgramType<E, A>[SummonerProgURI<S>][typeof overloadsSymb]>
  ) => InterpreterResult<E, A>[SummonerInterpURI<S>]
): { summon: S; tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>> } {
  type P<L, A> = ProgramType<L, A>[SummonerProgURI<S>]
  type M<L, A> = Materialized<L, A, SummonerProgURI<S>, SummonerInterpURI<S>>

  const summon = <L, A>(F: P<L, A>): M<L, A> =>
    materialize(
      cacheProgramEval(F),
      programInterpreter as <E, A>(
        program: ProgramType<E, A>[SummonerProgURI<S>]
      ) => InterpreterResult<E, A>[SummonerInterpURI<S>]
    )
  const tagged = makeTagged(summon as S) as TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>>

  return { summon: summon as S, tagged }
}
