import { JsonSchema, JsonSchemaURI } from '../hkt'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { jsonSchemaApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnknownInterpreter: ModelAlgebraUnknown1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  unknown: () => _env => new JsonSchema(SE.stateEither.of(AnythingTypeCtor())),
  unknownCfg: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(AnythingTypeCtor()), env))
}
