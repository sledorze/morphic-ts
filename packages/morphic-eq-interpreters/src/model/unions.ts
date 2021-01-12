import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { getGuardId, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'

import { EqType, EqURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const eqUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<EqURI, Env> => ({
    _F: EqURI,
    union: items => (guards, _name) => (env: Env) => {
      const items_ = items.map(_ => _(env).eq.equals)
      const guardId = getGuardId(guards as any, Symbol())
      return new EqType({
        equals: (a, b) => {
          if (a === b) {
            return true
          }
          const iA = guardId(a)
          return iA === guardId(b) && items_[iA](a, b)
        }
      })
    }
  })
)
