import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { CacheType } from '@morphic-ts/common/lib/core'
import type { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'

import type { InterpreterResult, InterpreterURI } from './InterpreterResult'
import type { Materialized } from './materializer'
import { materialize } from './materializer'
import type { Define, InferredProgram, Overloads } from './programs-infer'
import { defineFor } from './programs-infer'
import type { ProgramType, ProgramURI } from './ProgramType'
import type { TaggedBuilder } from './tagged-union'
import { makeTagged } from './tagged-union'

/**
 *  @since 0.0.1
 */
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R extends AnyConfigEnv> {
  <L, A>(F: InferredProgram<R, L, A, ProgURI>): Materialized<R, L, A, ProgURI, InterpURI>
  _P: ProgURI
  _I: InterpURI
  _R: R
}

type AnySummoners = Summoners<any, any, any> // ProgramURI, InterpreterURI, AnyConfigEnv>

/**
 *  @since 0.0.1
 */
export type SummonerProgURI<X extends AnySummoners> = NonNullable<X['_P']>
/**
 *  @since 0.0.1
 */
export type SummonerInterpURI<X extends AnySummoners> = NonNullable<X['_I']>
/**
 *  @since 0.0.1
 */
export type SummonerEnv<X extends AnySummoners> = NonNullable<X['_R']>

/**
 * - Cache application of the given interpreter
 * - Returns summoners giving the ability to constraint type parameters
 * - Returns the interpreter extended with matchers, monocle definitions, etc..
 */

/**
 *  @since 0.0.1
 */
export interface MakeSummonerResult<S extends AnySummoners> {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
}

/**
 *  @since 0.0.1
 */
export interface SummonerOps<S extends AnySummoners = never> {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
  define: Define<SummonerProgURI<S>, SummonerEnv<S>>
}

/**
 *  @since 0.0.1
 */
export function makeSummoner<S extends AnySummoners = never>(
  cacheProgramEval: CacheType,
  programInterpreter: <E, A>(
    program: Overloads<ProgramType<SummonerEnv<S>, E, A>[SummonerProgURI<S>]>
  ) => InterpreterResult<E, A>[SummonerInterpURI<S>]
): SummonerOps<S> {
  type PURI = SummonerProgURI<S>
  type InterpURI = SummonerInterpURI<S>
  type Env = SummonerEnv<S>

  type P<L, A> = ProgramType<Env, L, A>[PURI]
  type M<L, A> = Materialized<Env, L, A, PURI, InterpURI>

  const summon = (<L, A>(F: P<L, A>): M<L, A> =>
    materialize(
      cacheProgramEval(F),
      programInterpreter as <E, A>(program: P<E, A>) => InterpreterResult<E, A>[InterpURI]
    )) as S
  const tagged: TaggedBuilder<PURI, InterpURI, SummonerEnv<S>> = makeTagged(summon)
  const define = defineFor<PURI>(undefined as PURI)<Env>()
  return {
    summon,
    tagged,
    define
  }
}

/**
 *  @since 0.0.1
 */
export type ExtractEnv<Env, SummonerEnv extends URIS | URIS2> = {
  [k in SummonerEnv & keyof Env]: NonNullable<Env>[k & keyof Env]
}
/**
 *  @since 0.0.1
 */
export type AnyConfigEnv = AnyEnv
