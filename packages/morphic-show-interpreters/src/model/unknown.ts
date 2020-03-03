import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'

/**
 *  @since 0.0.1
 */
export const showUnknownInterpreter: ModelAlgebraUnknown1<ShowURI> = {
  _F: ShowURI,
  unknown: _ => new ShowType({ show: (_any: any) => '<unknown>' })
}
