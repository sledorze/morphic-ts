import { URI, makeBuilder } from '.'
import { ModelAlgebraObject1 } from '../../algebras/object'

export const builderObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: _props => makeBuilder(),
  partial: _props => makeBuilder()
}
