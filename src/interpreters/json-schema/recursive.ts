import { JsonSchema, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const jsonSchemaRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => new JsonSchema(a().schema)
}
