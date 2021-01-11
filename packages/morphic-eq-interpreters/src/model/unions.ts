import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import type { Either } from 'fp-ts/lib/Either'

import { EqType, EqURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const eqUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<EqURI, Env> => ({
    _F: EqURI,
    union: items => (guards, _name) => (env: Env) => {
      const items_ = items.map(_ => _(env).eq.equals)
      const len = guards.length
      return new EqType({
        equals: (a, b) => {
          if (a === b) {
            return true
          }
          for (let i = 0; i < len; i++) {
            const g: (x: unknown) => Either<any, any> = guards[i]
            if (g(a)._tag === 'Right' && g(b)._tag === 'Right') {
              return items_[i](a, b)
            }
          }
          return false
        }
      })
    }
  })
)
