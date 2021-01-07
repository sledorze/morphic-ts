import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { SetFromArrayTypeCtor } from '../json-schema/json-schema-ctors'
import { jsonSchemaApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const jsonSchemaSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    set: (getSchema, _name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(pipe(getSchema(env).schema, SEchainEitherK(SetFromArrayTypeCtor)), env, {})
      )
  })
)
