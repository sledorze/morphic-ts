import { JsonSchemaURI, JsonSchema } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { jsonSchemaApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    newtype: () => getJson => getJson,
    newtypeCfg: () => getJson => config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(getJson(env).schema, env))
  })
)
