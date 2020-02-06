import { cacheUnaryFunction } from 'morphic-common/lib/core'
import { BASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-BAST'
import { makeSummoner } from './usage/summoner'
import { makeTagged } from './usage/tagged-union'

const summon = makeSummoner(cacheUnaryFunction, BASTJInterpreter)
const tagged = makeTagged(summon)
/**
 *  @since 0.0.1
 */
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
