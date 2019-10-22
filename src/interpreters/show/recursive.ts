import { ShowType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const showRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => new ShowType(a().show)
}
