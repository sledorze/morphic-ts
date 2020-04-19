import * as chai from 'chai'
import { modelOrdInterpreter, OrdURI } from '../src/interpreters'
import { Ord } from 'fp-ts/lib/Ord'
import { Materialized } from '@morphic-ts/batteries/lib/usage/materializer'
import { ProgramOrderableURI } from '@morphic-ts/batteries/lib/program-orderable'
import { cacheUnaryFunction, Compact } from '@morphic-ts/common/lib/core'
import { makeSummoner, Summoners, AnyConfigEnv, ExtractEnv } from '@morphic-ts/batteries/lib/usage/summoner'
import { identity } from 'fp-ts/lib/function'
import { ProgramType } from '@morphic-ts/batteries/lib/usage/ProgramType'
import { Includes } from '@morphic-ts/common/lib/utils'
import { DepsErrorMsg } from '@morphic-ts/batteries/lib/usage/summoner'

interface OrdInterpreter<A> {
  ord: Ord<A>
}

const OrdInterpreterURI = 'OrdInterpreterURI' as const
export type OrdInterpreterURI = typeof OrdInterpreterURI

declare module '@morphic-ts/batteries/lib/usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [OrdInterpreterURI]: OrdInterpreter<A>
  }
}

/** Type level override to keep Morph type name short */
export interface M<R, L, A> extends Materialized<R, L, A, ProgramOrderableURI, OrdInterpreterURI> {}
export interface UM<R, A> extends Materialized<R, unknown, A, ProgramOrderableURI, OrdInterpreterURI> {}

export interface Summoner<R> extends Summoners<ProgramOrderableURI, OrdInterpreterURI, R> {
  <L, A, R2 extends R>(F: ProgramType<R2, L, A>[ProgramOrderableURI]): Includes<
    R,
    R2,
    M<R, L, A>,
    Compact<DepsErrorMsg<R, R2>>
  >
}

export const summonFor = <R extends AnyConfigEnv>(env: ExtractEnv<R, OrdURI>) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: identity,
    ord: program(modelOrdInterpreter)(env).ord
  }))

describe('Ord', () => {
  it('dummy', () => chai.assert.equal(1, 1))
})
