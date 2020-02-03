import { cacheUnaryFunction } from '@sledorze/morphic-common/lib/core'
import { BASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-BAST'
import { makeSummoner } from './usage/summoner'
import { makeTagged } from './usage/tagged-union'

const summon = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
const tagged = makeTagged(summon)
export { M, UM, AsOpaque, AsUOpaque, summon, tagged }
