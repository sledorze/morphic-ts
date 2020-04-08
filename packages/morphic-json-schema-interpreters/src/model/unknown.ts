import { JsonSchema, JsonSchemaURI } from '../hkt'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnknownInterpreter: ModelAlgebraUnknown1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  // TODO: add customize
  unknown: _ => _env => new JsonSchema(SE.stateEither.of(AnythingTypeCtor()))
}
