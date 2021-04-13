import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { getGuardId, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import { pipe } from 'fp-ts/lib/pipeable'

import { showApplyConfig } from './../config'
import { ShowType, ShowURI } from './../hkt'

/**
 *  @since 0.0.1
 */
export const showUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<ShowURI, Env> => ({
    _F: ShowURI,
    union: (...items) => (guards, config) => (env: Env) => {
      const items_ = items.map(_ => _(env).show.show)
      const guardId = getGuardId(guards as any, Symbol())
      return pipe(
        new ShowType(
          showApplyConfig(config?.conf)(
            {
              show: a => items_[guardId(a)](a)
            },
            env,
            {}
          )
        )
      )
    }
  })
)
