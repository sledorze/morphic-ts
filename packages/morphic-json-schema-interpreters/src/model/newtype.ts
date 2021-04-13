import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype } from '@morphic-ts/model-algebras/lib/newtype'
import { pipe } from 'fp-ts/lib/function'

import { jsonSchemaApplyConfig } from '../config'
import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/newtype' {
  export interface NewtypeConfig<L, A, N> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  export interface IsoConfig<L, A, N> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  export interface PrismConfig<L, A, N> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    newtype: () => (getJson, config) => env =>
      pipe(getJson(env).schema, schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema }))),
    newtypeIso: (iso, getJson, config) => env =>
      pipe(getJson(env).schema, schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema }))),
    newtypePrism: (prism, getJson, config) => env =>
      pipe(getJson(env).schema, schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema })))
  })
)
