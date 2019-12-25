import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../core'
import { BASTJInterpreter, M } from './interpreters-BAST'

const summoner = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
export const { summonAs, summonAsA, summonAsL, summon } = summoner
export { M }
