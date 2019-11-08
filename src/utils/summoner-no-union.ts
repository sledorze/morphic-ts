import { Materialized } from '../../src/usage/materializer'
import { makeSummoner } from '../../src/usage/summoner'
import { cacheUnaryFunction } from '../../src/core'

import { ProgramNoUnionURI, ProgramNoUnion } from './program-no-union'
import { ESBASTJInterpreter, ESBASTJInterpreterURI } from './interpreters-ESBAST'

export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

export interface Prog<L, A> extends ProgramNoUnion<L, A> {}

interface Summons {
  summonAs: <L, A>(F: Prog<L, A>) => M<L, A>
  summonAsA: <A>() => <L>(F: Prog<L, A>) => M<L, A>
  summonAsL: <L>() => <A>(F: Prog<L, A>) => M<L, A>
  summon: <A>(F: Prog<unknown, A>) => M<unknown, A>
}

const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter) as Summons

export { summonAs, summonAsA, summonAsL, summon }
