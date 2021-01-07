import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<ShowURI, Env> => ({
    _F: ShowURI,
    refined: (getShow, _ref, name, config) => env =>
      new ShowType({ show: x => `<${name}>(${showApplyConfig(config)(getShow(env).show, env, {}).show(x)})` })
  })
)
