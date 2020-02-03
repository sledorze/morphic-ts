import { JsonSchemaURI } from '..'
import { ModelAlgebraRefined1 } from '@sledorze/morphic-model-algebras/lib/refined'

export const jsonSchemaRefinedInterpreter: ModelAlgebraRefined1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  refined: (a, _ref, _name) => a as any // TODO: maybe define a names alias (definition), or description, in JsonSchema (config)
}
