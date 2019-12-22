import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../core'
import { BASTJInterpreter } from './interpreters-BAST'

const summoner = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
export const { summonAs, summonAsA, summonAsL, summon } = summoner

const res = summoner.summon(F => F.strMap(F.interface({ x: F.string() }, 'e')))
