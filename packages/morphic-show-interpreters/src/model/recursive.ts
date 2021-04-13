import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'

import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const showRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<ShowURI, Env> => ({
    _F: ShowURI,
    recursive: (a, config) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = env =>
        new ShowType(showApplyConfig(config?.conf)({ show: a => get()(env).show.show(a) }, env, {}))
      return res
    }
  })
)
