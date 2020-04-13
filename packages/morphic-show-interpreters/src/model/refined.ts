import { ShowType, ShowURI } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { showApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter: ModelAlgebraRefined1<ShowURI> = {
  _F: ShowURI,
  refined: (getShow, _ref, name) => env => new ShowType({ show: x => `<${name}>(${getShow(env).show.show(x)})` }),
  refinedCfg: (getShow, _ref, name) => config => env =>
    new ShowType({ show: x => `<${name}>(${showApplyConfig(config)(getShow(env).show, env).show(x)})` })
}
