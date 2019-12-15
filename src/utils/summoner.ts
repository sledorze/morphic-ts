import { Materialized } from '../usage/materializer'
import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../core'
import { BASTJInterpreterURI, BASTJInterpreter } from './interpreters-BAST'
import { ProgramUnionURI } from './program'
import { Program } from '../usage/programs-hkt'

export interface M<E, A> extends Materialized<E, A, ProgramUnionURI, BASTJInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramUnionURI, BASTJInterpreterURI> {}

// export interface Prog<L, A> extends ProgramUnion<L, A> {}
export type Prog<L, A> = Program<ProgramUnionURI, L, A>

interface Summons {
  summonAs: <L, A>(F: Prog<L, A>) => M<L, A>
  summonAsA: <A>() => <L>(F: Prog<L, A>) => M<L, A>
  summonAsL: <L>() => <A>(F: Prog<L, A>) => M<L, A>
  summon: <A>(F: Prog<unknown, A>) => UM<A>
}

const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, BASTJInterpreter) as Summons

export { summonAs, summonAsA, summonAsL, summon }
