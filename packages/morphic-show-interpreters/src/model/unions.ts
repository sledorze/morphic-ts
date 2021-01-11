import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import type { Either } from 'fp-ts/lib/Either'

import { ShowType, ShowURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const showUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<ShowURI, Env> => ({
    _F: ShowURI,
    union: items => (guards, _name) => (env: Env) => {
      const items_ = items.map(_ => _(env).show.show)
      const len = guards.length
      return new ShowType({
        show: a => {
          for (let i = 0; i < len; i++) {
            const g: (x: unknown) => Either<any, any> = guards[i]
            if (g(a)._tag === 'Right') {
              return items_[i](a)
            }
          }
          return '<No Show Instance>'
        }
      })
    }
  })
)
