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
  date: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'date' }))),
  string: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({}))),
  number: _ => _env => new JsonSchema(SE.stateEither.of(NumberTypeCtor())),
  bigint: _ => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'bigint' }))),
  boolean: _ => _env => new JsonSchema(SE.stateEither.of(BooleanTypeCtor())),
  stringLiteral: v => _env => new JsonSchema(SE.stateEither.of(LiteralTypeCtor(v))),
  keysOf: _keys => _env => new JsonSchema(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
  // TODO: add customize
  nullable: getSchema => _config => env =>
    new JsonSchema(SE.stateEither.map(getSchema(env).schema, v => optional(v.json))),
  // TODO: add customize
  array: getSchema => _config => env =>
    new JsonSchema(SE.stateEither.chain(getSchema(env).schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas }))))
}
