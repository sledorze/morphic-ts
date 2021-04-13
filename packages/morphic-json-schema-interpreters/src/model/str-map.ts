import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'
import { StrMapTypeCtor } from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [JsonSchemaURI]: {
      domainSchema: JsonSchemaResult<OptionalJSONSchema>
      codomainSchema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    strMap: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(pipe(schema, SEchainEitherK(StrMapTypeCtor)), env, { schema })
          )
      ),
    record: (getDomainSchema, getCodomainSchema, config) => env =>
      pipe(
        [getDomainSchema(env).schema, getCodomainSchema(env).schema],
        ([domainSchema, codomainSchema]) =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(pipe(codomainSchema, SEchainEitherK(StrMapTypeCtor)), env, {
              domainSchema,
              codomainSchema
            })
          )
      )
  })
)
