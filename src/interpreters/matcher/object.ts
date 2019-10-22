import { URI, makeMatcher } from '.'
import { ModelAlgebraObject1 } from '../../algebras/object'

export const matcherObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: _props => makeMatcher(),
  partial: _props => makeMatcher()
}
