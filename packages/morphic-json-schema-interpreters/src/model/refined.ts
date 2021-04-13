import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import { pipe } from 'fp-ts/function'

import { jsonSchemaApplyConfig } from '../config'
import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    refined: (getJsonSchema, _ref, config) => env =>
      pipe(
        getJsonSchema(env).schema,
        schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema }))
      ),
    constrained: (getJsonSchema, _ref, config) => env =>
      pipe(
        getJsonSchema(env).schema,
        schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema }))
      )
  })
)
