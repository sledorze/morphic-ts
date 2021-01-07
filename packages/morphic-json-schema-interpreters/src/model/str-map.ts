import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { StrMapTypeCtor } from '../json-schema/json-schema-ctors'

/**
 *  @since 0.0.1
 */
export const jsonSchemaStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    strMap: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(pipe(getSchema(env).schema, SEchainEitherK(StrMapTypeCtor)), env, {})
      ),
    record: (_getdDomainSchema, getCodomainSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(pipe(getCodomainSchema(env).schema, SEchainEitherK(StrMapTypeCtor)), env, {})
      )
  })
)
