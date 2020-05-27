import { JsonSchemaURI, JsonSchema } from '../hkt'
import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { jsonSchemaApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    newtype: () => (getJson, config) => env => new JsonSchema(jsonSchemaApplyConfig(config)(getJson(env).schema, env))
  })
)
