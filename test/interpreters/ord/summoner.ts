import * as chai from 'chai'
import { modelOrdInterpreter } from '../../../src/ord-interpreters/interpreters'
import { Ord } from 'fp-ts/lib/Ord'
import { ProgramInterpreter, Materialized } from '../../../src/usage/materializer'
import { ProgramOrderableURI } from '../../../src/batteries/program-orderable'
import { cacheUnaryFunction } from '../../../src/common/core'
import { makeSummoner, Summoners } from '../../../src/usage/summoner'
import { interpretable } from '../../../src/usage/programs-infer'
import { identity } from 'fp-ts/lib/function'
import { ProgramType } from '../../../src/usage/ProgramType'

interface OrdInterpreter<E, A> {
  ord: Ord<A>
}

const OrdInterpreterURI = Symbol()
export type OrdInterpreterURI = typeof OrdInterpreterURI

declare module '../../../src/usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [OrdInterpreterURI]: OrdInterpreter<E, A>
  }
}
declare module '../../../src/usage/programs-infer' {
  interface ProgramOrderableInterpreters {
    [OrdInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramOrderableURI, OrdInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramOrderableURI, OrdInterpreterURI> {}

export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramOrderableURI]): M<L, A>
}
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramOrderableURI]) => M<L, A>
}
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramOrderableURI]) => M<L, A>
}
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramOrderableURI]): UM<A>
}

export interface Summoner extends Summoners<ProgramOrderableURI, OrdInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}

export const OrdInterpreter: ProgramInterpreter<ProgramOrderableURI, OrdInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: identity,
    ord: program(modelOrdInterpreter).ord
  }
}

const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, OrdInterpreter)

export { summonAs, summonAsA, summonAsL, summon }

describe('Ord', () => {
  it('dummy', () => chai.assert.equal(1, 1))
})
