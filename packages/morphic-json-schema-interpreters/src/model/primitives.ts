import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { JsonSchema, JsonSchemaURI } from '..'
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
  date: _ => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'date' }))),
  string: _ => new JsonSchema(SE.stateEither.of(StringTypeCtor({}))),
  number: _ => new JsonSchema(SE.stateEither.of(NumberTypeCtor())),
  bigint: _ => new JsonSchema(SE.stateEither.of(StringTypeCtor({ format: 'bigint' }))),
  boolean: _ => new JsonSchema(SE.stateEither.of(BooleanTypeCtor())),
  stringLiteral: <T extends string>(v: T) => new JsonSchema<T>(SE.stateEither.of(LiteralTypeCtor(v))),
  keysOf: _keys => new JsonSchema(SE.stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
  nullable: ({ schema }) => new JsonSchema(SE.stateEither.map(schema, v => optional(v.json))),
  array: ({ schema }) =>
    new JsonSchema(SE.stateEither.chain(schema, schemas => SE.fromEither(ArrayTypeCtor({ schemas }))))
}
