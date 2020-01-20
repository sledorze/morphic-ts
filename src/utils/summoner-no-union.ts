import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../common/core'
import { ESBASTJInterpreter } from './interpreters-ESBAST'

export const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter)
