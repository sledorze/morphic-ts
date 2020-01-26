import { ShowURI, ShowType } from '..'
import { ModelAlgebraNewtype1 } from '../../model-algebras/newtype'

export const showNewtypeInterpreter: ModelAlgebraNewtype1<ShowURI> = {
  newtype: name => a => new ShowType({ show: x => `<${name}>(${a.show.show(x as any)})` })
}
