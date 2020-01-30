import { ModelAlgebraPrimitive1 } from '../../model-algebras/primitives'
import { JsonSchema, JsonSchemaURI } from '..'
import {
  StringTypeCtor,
  NumberTypeCtor,
  BooleanTypeCtor,
  LiteralTypeCtor,
  optional,
  ArrayTypeCtor
} from '../../json-schema/json-schema-ctors'
import * as SE from '../StateEither'
import { stateEither } from '../StateEither'

export const jsonSchemaPrimitiveInterpreter: ModelAlgebraPrimitive1<JsonSchemaURI> = {
  date: _ => new JsonSchema(stateEither.of(StringTypeCtor({ format: 'date' }))),
  string: _ => new JsonSchema(stateEither.of(StringTypeCtor({}))),
  number: _ => new JsonSchema(stateEither.of(NumberTypeCtor())),
  boolean: _ => new JsonSchema(stateEither.of(BooleanTypeCtor())),
  stringLiteral: <T extends string>(v: T) => new JsonSchema<T>(stateEither.of(LiteralTypeCtor(v))),
  keysOf: _keys => new JsonSchema(stateEither.of(StringTypeCtor({ enum: Object.keys(_keys) }))),
  nullable: ({ schema }) => new JsonSchema(stateEither.map(schema, v => optional(v.json))),
  array: ({ schema }) =>
    new JsonSchema(stateEither.chain(schema, schemas => SE.StateEither(ArrayTypeCtor({ schemas }))))
}
