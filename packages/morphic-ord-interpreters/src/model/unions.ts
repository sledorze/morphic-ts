import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { getGuardId, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import { fromCompare } from 'fp-ts/lib/Ord'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const ordUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<OrdURI, Env> => ({
    _F: OrdURI,
    union: (...items) => (guards, config) => {
      const guardId = getGuardId(guards as any, Symbol())
      return (env: Env) => {
        const items_ = items.map(_ => _(env).ord.compare)
        return new OrdType(
          ordApplyConfig(config?.conf)(
            fromCompare((a, b) => {
              if (a === b) {
                return 0
              }
              const iA = guardId(a)
              const iB = guardId(b)
              return iA === iB ? items_[iA](a, b) : iA < iB ? -1 : 1
            }),
            env,
            {}
          )
        )
      }
    }
  })
)
