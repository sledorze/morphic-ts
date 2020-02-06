import { ShowURI, ShowType } from '..'
import { ModelAlgebraNewtype1 } from 'morphic-model-algebras/lib/newtype'

/**
 *  @since 0.0.1
 */
export const showNewtypeInterpreter: ModelAlgebraNewtype1<ShowURI> = {
  _F: ShowURI,
  newtype: name => a => new ShowType({ show: x => `<${name}>(${a.show.show(x as any)})` })
}
