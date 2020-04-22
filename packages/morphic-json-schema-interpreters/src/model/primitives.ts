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
    date: _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'date' }))),
    dateCfg: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ format: 'date' })), env)),
    string: _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({}))),
    stringCfg: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({})), env)),
    number: _env => new JsonSchema(SE.stateEither.of(NumberTypeCtor())),
    numberCfg: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(NumberTypeCtor()), env)),
    bigint: _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'bigint' }))),
    bigintCfg: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ format: 'bigint' })), env)),
    boolean: _env => new JsonSchema(SE.stateEither.of(BooleanTypeCtor())),
    booleanCfg: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(BooleanTypeCtor()), env)),
    stringLiteral: v => _env => new JsonSchema(SE.stateEither.of(LiteralTypeCtor(v))),
    stringLiteralCfg: v => config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SE.stateEither.of(LiteralTypeCtor(v)), env)),
    keysOf: _keys => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
    keysOfCfg: _keys => config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) })), env)
      ),
    nullable: getSchema => env => new JsonSchema(SE.stateEither.map(getSchema(env).schema, v => optional(v.json))),
    nullableCfg: getSchema => config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SE.stateEither.map(getSchema(env).schema, v => optional(v.json)),
          env
        )
      ),
    array: getSchema => env =>
      new JsonSchema(SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas })))),
    arrayCfg: getSchema => config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas }))),
          env
        )
      )
  })
)
