import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../common/core'
import { ESBASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-ESBAST'

export const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter)
export { M, UM, AsOpaque, AsUOpaque }
