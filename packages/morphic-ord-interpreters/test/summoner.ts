import * as chai from 'chai'
import { modelOrdInterpreter } from '../src/interpreters'
import { Ord } from 'fp-ts/lib/Ord'
import { ProgramInterpreter, Materialized } from '@morphic-ts/batteries/lib/usage/materializer'
import { ProgramOrderableURI } from '@morphic-ts/batteries/lib/program-orderable'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { makeSummoner, Summoners } from '@morphic-ts/batteries/lib/usage/summoner'
import { interpretable } from '@morphic-ts/batteries/lib/usage/programs-infer'
import { identity } from 'fp-ts/lib/function'
import { ProgramType } from '@morphic-ts/batteries/lib/usage/ProgramType'

interface OrdInterpreter<E, A> {
  ord: Ord<A>
}

const OrdInterpreterURI = Symbol()
export type OrdInterpreterURI = typeof OrdInterpreterURI

declare module '@morphic-ts/batteries/lib/usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [OrdInterpreterURI]: OrdInterpreter<E, A>
  }
}
declare module '@morphic-ts/batteries/lib/usage/ProgramType' {
  interface ProgramOrderableInterpreters {
    [OrdInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramOrderableURI, OrdInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramOrderableURI, OrdInterpreterURI> {}

export interface Morph {
  <L, A>(F: ProgramType<L, A>[ProgramOrderableURI]): M<L, A>
}

export interface Summoner extends Summoners<ProgramOrderableURI, OrdInterpreterURI>, Morph {}

export const OrdInterpreter: ProgramInterpreter<ProgramOrderableURI, OrdInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: identity,
    ord: program(modelOrdInterpreter).ord
  }
}

export const summon = makeSummoner(cacheUnaryFunction, OrdInterpreter)

describe('Ord', () => {
  it('dummy', () => chai.assert.equal(1, 1))
})
