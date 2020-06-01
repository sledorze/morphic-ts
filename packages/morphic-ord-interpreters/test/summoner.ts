import * as chai from 'chai'
import { modelOrdInterpreter, OrdURI } from '../src/interpreters'
import type { Ord } from 'fp-ts/lib/Ord'
import type { Materialized } from '@morphic-ts/summoners'
import type { ProgramOrderableURI } from '@morphic-ts/batteries/lib/program-orderable'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { makeSummoner } from '@morphic-ts/summoners'
import type { Summoners } from '@morphic-ts/summoners'
import type { AnyConfigEnv, ExtractEnv } from '@morphic-ts/summoners/lib/summoner'
import type { ProgramType } from '@morphic-ts/summoners'

interface OrdInterpreter<A> {
  ord: Ord<A>
}

const OrdInterpreterURI = 'OrdInterpreterURI' as const
export type OrdInterpreterURI = typeof OrdInterpreterURI

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [OrdInterpreterURI]: OrdInterpreter<A>
  }
}

/** Type level override to keep Morph type name short */
export interface M<R, L, A> extends Materialized<R, L, A, ProgramOrderableURI, OrdInterpreterURI> {}
export interface UM<R, A> extends Materialized<R, {}, A, ProgramOrderableURI, OrdInterpreterURI> {}

export interface Summoner<R> extends Summoners<ProgramOrderableURI, OrdInterpreterURI, R> {
  <L, A>(F: ProgramType<R, L, A>[ProgramOrderableURI]): M<R, L, A>
}

export const summonFor = <R extends AnyConfigEnv = {}>(env: ExtractEnv<R, OrdURI>) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: <A>(a: A) => a,
    ord: program(modelOrdInterpreter<NonNullable<R>>())(env).ord
  }))

describe('Ord', () => {
  it('dummy', () => chai.assert.equal(1, 1))
})
