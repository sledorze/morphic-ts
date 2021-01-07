import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { stateEither as SEstateEither } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    unknown: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(AnythingTypeCtor()), env, {}))
  })
)
