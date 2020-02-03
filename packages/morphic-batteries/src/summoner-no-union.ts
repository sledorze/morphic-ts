import { makeSummoner } from '@sledorze/morphic-usage/lib/summoner'
import { cacheUnaryFunction } from '@sledorze/morphic-common/lib/core'
import { ESBASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-ESBAST'
import { makeTagged } from '@sledorze/morphic-usage/lib/tagged-union'

const summon = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter)
const tagged = makeTagged(summon)
export { M, UM, AsOpaque, AsUOpaque, summon, tagged }
