import { ShowType, ShowURI } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<ShowURI, Env> => ({
    _F: ShowURI,
    refined: (getShow, _ref, name) => env => new ShowType({ show: x => `<${name}>(${getShow(env).show.show(x)})` }),
    refinedCfg: (getShow, _ref, name) => config => env =>
      new ShowType({ show: x => `<${name}>(${showApplyConfig(config)(getShow(env).show, env).show(x)})` })
  })
)
