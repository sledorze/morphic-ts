import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { pipe } from 'fp-ts/function'
import type { Show } from 'fp-ts/lib/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unknown' {
  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {
    [ShowURI]: {
      show: Show<unknown>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const showUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<ShowURI, Env> => ({
    _F: ShowURI,
    unknown: config => env =>
      pipe(
        { show: (_any: any) => '<unknown>' } as Show<unknown>,
        show => new ShowType(showApplyConfig(config?.conf)(show, env, { show }))
      )
  })
)
