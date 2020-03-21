import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { makeSummoner } from './usage/summoner'
import { makeTagged } from './usage/tagged-union'
import { ESBASTInterpreter, M, UM, AsOpaque, AsUOpaque, Summoner } from './interpreters-ESBAST'

const summon = makeSummoner(cacheUnaryFunction, ESBASTInterpreter) as Summoner
const tagged = makeTagged(summon)
export {
  /**
   *  @since 0.0.1
   */
  M,
  /**
   *  @since 0.0.1
   */
  UM,
  /**
   *  @since 0.0.1
   */
  AsOpaque,
  /**
   *  @since 0.0.1
   */
  AsUOpaque,
  /**
   *  @since 0.0.1
   */
  summon,
  /**
   *  @since 0.0.1
   */
  tagged
}
