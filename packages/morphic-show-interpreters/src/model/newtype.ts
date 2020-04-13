import { ShowURI, ShowType } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { showApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const showNewtypeInterpreter: ModelAlgebraNewtype1<ShowURI> = {
  _F: ShowURI,
  newtype: name => a => env => new ShowType({ show: x => `<${name}>(${a(env).show.show(x as any)})` }),
  newtypeCfg: name => a => config => env =>
    new ShowType(showApplyConfig(config)({ show: x => `<${name}>(${a(env).show.show(x as any)})` }, env))
}
