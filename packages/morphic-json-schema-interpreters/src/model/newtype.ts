import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype } from '@morphic-ts/model-algebras/lib/newtype'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    newtype: () => (getJson, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(getJson(env).schema, env, {}))
  })
)
