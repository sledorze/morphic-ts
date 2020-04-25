import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import {
  StringTypeCtor,
  NumberTypeCtor,
  BooleanTypeCtor,
  LiteralTypeCtor,
  optional,
  ArrayTypeCtor
} from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { jsonSchemaApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    date: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ format: 'date' })), env)),
    string: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({})), env)),
    number: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(NumberTypeCtor()), env)),
    bigint: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ format: 'bigint' })), env)),
    boolean: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(BooleanTypeCtor()), env)),
    stringLiteral: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(LiteralTypeCtor(v)), env)),
    keysOf: (_keys, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) })), env)
      ),
    nullable: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SE.stateEither.map(getSchema(env).schema, v => optional(v.json)),
          env
        )
      ),
    array: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas }))),
          env
        )
      ),
    uuid: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ format: 'uuid' })), env))
  })
)
