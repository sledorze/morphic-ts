import { makeSummoner } from '@sledorze/morphic-usage/lib/summoner'
import { cacheUnaryFunction } from '@sledorze/morphic-common/lib/core'
import { BASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-BAST'
import { makeTagged } from '@sledorze/morphic-usage/lib/tagged-union'

const summon = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
const tagged = makeTagged(summon)
export { M, UM, AsOpaque, AsUOpaque, summon, tagged }
