import { JsonSchema, JsonSchemaURI } from '..'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'
import { stateEither } from '../StateEither'
import { ModelAlgebraUnknown1 } from '@sledorze/morphic-model-algebras/lib/unknown'

export const jsonSchemaUnknownInterpreter: ModelAlgebraUnknown1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  unknown: _ => new JsonSchema(stateEither.of(AnythingTypeCtor()))
}