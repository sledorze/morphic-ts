import { JsonSchemaURI, JsonSchema } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { jsonSchemaApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  newtype: () => getJson => getJson,
  newtypeCfg: () => getJson => config => env => new JsonSchema(jsonSchemaApplyConfig(config)(getJson(env).schema, env))
}
