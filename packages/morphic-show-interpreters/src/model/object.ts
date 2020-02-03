import { ModelAlgebraObject1 } from '@sledorze/morphic-model-algebras/lib/object'
import { ShowType, ShowURI } from '..'
import { projectField } from '@sledorze/morphic-common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'

export const showObjectInterpreter: ModelAlgebraObject1<ShowURI> = {
  _F: ShowURI,
  interface: props => new ShowType(getStructShow(projectField(props)('show'))),
  partial: props => new ShowType(getStructShow(projectField(props)('show'))) as any // FIXME: relies on Show<A> whereas we need Show<Partial<A>>
}
