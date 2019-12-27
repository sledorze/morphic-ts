import { BuilderURI, makeBuilder } from '.'
import { ModelAlgebraObject1 } from '../../algebras/object'

export const builderObjectInterpreter: ModelAlgebraObject1<BuilderURI> = {
  interface: _props => makeBuilder(),
  partial: _props => makeBuilder()
}
