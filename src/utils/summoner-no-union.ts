import { Materialized } from '../usage/materializer'
import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../core'

import { ProgramNoUnionURI } from './program-no-union'
import { ESBASTJInterpreter, ESBASTJInterpreterURI } from './interpreters-ESBAST'
import { Program } from '../usage/programs-hkt'

export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

export interface Prog<L, A> extends Program<ProgramNoUnionURI, L, A> {}

interface Summons {
  summonAs: <L, A>(F: Prog<L, A>) => M<L, A>
  summonAsA: <A>() => <L>(F: Prog<L, A>) => M<L, A>
  summonAsL: <L>() => <A>(F: Prog<L, A>) => M<L, A>
  summon: <A>(F: Prog<unknown, A>) => M<unknown, A>
}

const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter) as Summons

export { summonAs, summonAsA, summonAsL, summon }
