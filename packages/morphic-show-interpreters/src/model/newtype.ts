import { ShowURI, ShowType } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

/**
 *  @since 0.0.1
 */
export const showNewtypeInterpreter: ModelAlgebraNewtype1<ShowURI> = {
  _F: ShowURI,
  // TODO: add customize
  newtype: name => a => _config => env => new ShowType({ show: x => `<${name}>(${a(env).show.show(x as any)})` })
}
