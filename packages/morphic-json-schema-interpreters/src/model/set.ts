import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'
import { SetFromArrayTypeCtor } from '../json-schema/json-schema-ctors'
import { jsonSchemaApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    set: (getSchema, _ord, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(pipe(schema, SEchainEitherK(SetFromArrayTypeCtor)), env, { schema })
          )
      )
  })
)
