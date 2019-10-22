import { ModelAlgebraObject1 } from '../../algebras/object'
import { ShowType, URI } from '.'
import { projectField } from '../../utils'
import { getStructShow } from 'fp-ts/lib/Show'

export const showObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: props => new ShowType(getStructShow(projectField(props)('show'))),
  partial: props => new ShowType(getStructShow(projectField(props)('show'))) as any // FIXME: relies on Show<A> whereas we need Show<Partial<A>>
}
