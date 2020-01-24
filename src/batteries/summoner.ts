import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../common/core'
import { BASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-BAST'

export const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
export { M, UM, AsOpaque, AsUOpaque }
