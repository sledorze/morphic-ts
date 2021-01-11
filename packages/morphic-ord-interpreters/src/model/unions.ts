import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import type { Either } from 'fp-ts/lib/Either'
import { fromCompare } from 'fp-ts/lib/Ord'

import { OrdType, OrdURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const ordUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<OrdURI, Env> => ({
    _F: OrdURI,
    union: items => (guards, _name) => (env: Env) => {
      const items_ = items.map(_ => _(env).ord.compare)
      const len = guards.length
      return new OrdType(
        fromCompare((a, b) => {
          if (a === b) {
            return 0
          }
          let iA = -1
          let iB = -1
          for (let i = 0; i < len; i++) {
            const g: (x: unknown) => Either<any, any> = guards[i]
            if (iA === -1 && g(a)._tag === 'Right') {
              iA = i
              if (iB !== -1) {
                break
              }
            }
            if (iB === -1 && g(b)._tag === 'Right') {
              iB = i
              if (iA !== -1) {
                break
              }
            }
          }
          return iA === iB ? items_[iA](a, b) : iA < iB ? -1 : 1
        })
      )
    }
  })
)
