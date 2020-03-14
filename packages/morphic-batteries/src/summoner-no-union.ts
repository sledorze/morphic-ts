import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { ESBASTJInterpreter, M, UM, AsOpaque, AsUOpaque } from './interpreters-ESBAST'
import { makeSummoner } from './usage/summoner'
import { makeTagged } from './usage/tagged-union'

export {} from '@morphic-ts/io-ts-interpreters/lib'
export {} from '@morphic-ts/eq-interpreters/lib'
export {} from '@morphic-ts/fastcheck-interpreters/lib'
export {} from '@morphic-ts/show-interpreters/lib'
export {} from '@morphic-ts/json-schema-interpreters/lib'

export {} from '@morphic-ts/io-ts-interpreters/lib/model/term'
export {} from '@morphic-ts/eq-interpreters/lib/model-eq/term'
export {} from '@morphic-ts/fastcheck-interpreters/lib/model/term'
export {} from '@morphic-ts/show-interpreters/lib/model/term'
export {} from '@morphic-ts/json-schema-interpreters/lib/model/term'

const summon = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter)
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
