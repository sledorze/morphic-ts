import { makeSummoner } from '../usage/summoner'
import { cacheUnaryFunction } from '../common/core'
import { BASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-BAST'
import { makeTagged } from '../usage/tagged-union'

const summon = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
const tagged = makeTagged(summon)
export { M, UM, AsOpaque, AsUOpaque, summon, tagged }
