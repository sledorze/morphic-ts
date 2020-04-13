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

/**
 *  @since 0.0.1
 */
export const jsonSchemaPrimitiveInterpreter: ModelAlgebraPrimitive1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  date: () => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'date' }))),
  // TODO: add customize
  dateCfg: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'date' }))),
  string: () => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({}))),
  // TODO: add customize
  stringCfg: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({}))),
  number: () => _env => new JsonSchema(SE.stateEither.of(NumberTypeCtor())),
  // TODO: add customize
  numberCfg: _ => _env => new JsonSchema(SE.stateEither.of(NumberTypeCtor())),
  bigint: () => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'bigint' }))),
  // TODO: add customize
  bigintCfg: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'bigint' }))),
  boolean: () => _env => new JsonSchema(SE.stateEither.of(BooleanTypeCtor())),
  // TODO: add customize
  booleanCfg: _ => _env => new JsonSchema(SE.stateEither.of(BooleanTypeCtor())),
  stringLiteral: v => _env => new JsonSchema(SE.stateEither.of(LiteralTypeCtor(v))),
  // TODO: add customize
  stringLiteralCfg: v => _config => _env => new JsonSchema(SE.stateEither.of(LiteralTypeCtor(v))),
  keysOf: _keys => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
  // TODO: add customize
  keysOfCfg: _keys => _config => _env =>
    new JsonSchema(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
  nullable: getSchema => env => new JsonSchema(SE.stateEither.map(getSchema(env).schema, v => optional(v.json))),
  // TODO: add customize
  nullableCfg: getSchema => _config => env =>
    new JsonSchema(SE.stateEither.map(getSchema(env).schema, v => optional(v.json))),
  array: getSchema => env =>
    new JsonSchema(SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas })))),
  // TODO: add customize
  arrayCfg: getSchema => _config => env =>
    new JsonSchema(SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas }))))
}
