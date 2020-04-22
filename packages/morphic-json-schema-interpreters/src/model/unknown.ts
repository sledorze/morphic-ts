import { JsonSchema, JsonSchemaURI } from '../hkt'
import { AnythingTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { jsonSchemaApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    unknown: _env => new JsonSchema(SE.stateEither.of(AnythingTypeCtor())),
    unknownCfg: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(AnythingTypeCtor()), env))
  })
)
