import { makeSummoner, Summoned } from '../usage/summoner'
import { cacheUnaryFunction } from '../core'
import { BASTJInterpreter } from './interpreters-BAST'

export const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
export type M<L, A> = Summoned<'ProgramUnion', 'BASTJInterpreter', L, A>
