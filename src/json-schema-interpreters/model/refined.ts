import { JsonSchemaURI } from '..'
import { ModelAlgebraRefined1 } from '../../model-algebras/refined'

export const jsonSchemaRefinedInterpreter: ModelAlgebraRefined1<JsonSchemaURI> = {
  refined: (a, _ref, _name) => a // TODO: maybe define a names alias (definition), or description, in JsonSchema (config)
}
