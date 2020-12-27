import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    refined: (getJsonSchema, _ref, _name, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(getJsonSchema(env).schema, env))
  })
)
