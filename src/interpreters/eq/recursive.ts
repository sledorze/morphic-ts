import { EqType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const eqRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => new EqType(a().eq)
}
