import { ShowType, ShowURI } from '..'
import { ModelAlgebraUnknown1 } from '../../model-algebras/unknown'

export const showUnknownInterpreter: ModelAlgebraUnknown1<ShowURI> = {
  unknown: _ => new ShowType({ show: (_any: any) => '<unknown>' })
}
