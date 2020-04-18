import { InferredProgram, Overloads, defineFor, Define } from './programs-infer'
import { materialize, Materialized } from './materializer'
import { InterpreterURI, InterpreterResult } from './InterpreterResult'
import { CacheType } from '@morphic-ts/common/lib/core'
import { ProgramURI, ProgramType } from './ProgramType'
import { makeTagged, TaggedBuilder } from './tagged-union'
import { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R extends AnyConfigEnv> {
  <L, A>(F: InferredProgram<R, L, A, ProgURI>): Materialized<R, L, A, ProgURI, InterpURI>
  _P: ProgURI
  _I: InterpURI
  _R: R
}
export type SummonerProgURI<X extends Summoners<any, any, any>> = NonNullable<X['_P']>
export type SummonerInterpURI<X extends Summoners<any, any, any>> = NonNullable<X['_I']>
export type SummonerEnv<X extends Summoners<any, any, any>> = NonNullable<X['_R']>

/**
 * - Cache application of the given interpreter
 * - Returns summoners giving the ability to constraint type parameters
 * - Returns the interpreter extended with matchers, monocle definitions, etc..
 */

export interface MakeSummonerResult<S extends Summoners<any, any, any>> {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
}

/**
 *  @since 0.0.1
 */
export function makeSummoner<S extends Summoners<any, any, any> = never>(
  cacheProgramEval: CacheType,
  programInterpreter: <E, A>(
    program: Overloads<ProgramType<SummonerEnv<S>, E, A>[SummonerProgURI<S>]>
  ) => InterpreterResult<E, A>[SummonerInterpURI<S>]
): {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
  define: Define<SummonerProgURI<S>>
} {
  type PURI = SummonerProgURI<S>
  type InterpURI = SummonerInterpURI<S>
  type Env = SummonerEnv<S>

  type P<L, A> = ProgramType<Env, L, A>[PURI]
  type M<L, A> = Materialized<Env, L, A, PURI, InterpURI>

  const summon =
    (<L, A>(F: P<L, A>): M<L, A> =>
      materialize(
        cacheProgramEval(F),
        programInterpreter as <E, A>(program: P<E, A>) => InterpreterResult<E, A>[InterpURI]
      )) as S
  const tagged = (makeTagged(summon) as any) as TaggedBuilder<PURI, InterpURI, SummonerEnv<S>> // FIXME: as any
  const define = defineFor<PURI>(undefined as PURI)

  return {
    summon,
    tagged,
    define
  }
}

export type DepsErrorMsg<R, R2> = ['summon env error, got ', R, ' but requires ', R2, ' please provide dependencies']

export type ExtractEnv<Env, SummonerEnv extends URIS | URIS2> = {
  [k in SummonerEnv & keyof Env]: NonNullable<Env>[k & keyof Env]
}
export type AnyConfigEnv = Partial<Record<URIS | URIS2, any>>
