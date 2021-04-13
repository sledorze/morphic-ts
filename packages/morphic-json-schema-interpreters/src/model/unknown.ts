import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { pipe } from 'fp-ts/lib/function'
import { stateEither as SEstateEither } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/unknown' {
  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    unknown: config => env =>
      pipe(
        SEstateEither.of(AnythingTypeCtor()),
        (schema: JsonSchemaResult<OptionalJSONSchema>) =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(schema, env, {
              schema
            })
          )
      )
  })
)
