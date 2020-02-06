import { ModelAlgebraObject1 } from '@morphic/model-algebras/lib/object'
import { ShowType, ShowURI } from '..'
import { projectField } from '@morphic/common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'

/**
 *  @since 0.0.1
 */
export const showObjectInterpreter: ModelAlgebraObject1<ShowURI> = {
  _F: ShowURI,
  interface: props => new ShowType(getStructShow(projectField(props)('show'))),
  partial: props => new ShowType(getStructShow(projectField(props)('show'))) as any // FIXME: relies on Show<A> whereas we need Show<Partial<A>>
}
