import { ShowType, ShowURI } from '..'
import { ModelAlgebraUnknown1 } from '@sledorze/morphic-model-algebras/lib/unknown'

export const showUnknownInterpreter: ModelAlgebraUnknown1<ShowURI> = {
  _F: ShowURI,
  unknown: _ => new ShowType({ show: (_any: any) => '<unknown>' })
}
