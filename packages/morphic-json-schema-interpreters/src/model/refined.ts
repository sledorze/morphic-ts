import { JsonSchemaURI, JsonSchema } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { jsonSchemaApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    refined: (getJsonSchema, _ref, _name, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(getJsonSchema(env).schema, env))
  })
)
