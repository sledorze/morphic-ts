import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { JsonSchema, URI } from '.'
import {
  StringTypeCtor,
  NumberTypeCtor,
  BooleanTypeCtor,
  LiteralTypeCtor,
  optional,
  ArrayTypeCtor
} from '../../json-schema/json-schema-ctors'
import { right } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'

export const jsonSchemaPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: _ => new JsonSchema(right(StringTypeCtor({ format: 'date' }))),
  string: _ => new JsonSchema(right(StringTypeCtor({}))),
  number: _ => new JsonSchema(right(NumberTypeCtor())),
  boolean: _ => new JsonSchema(right(BooleanTypeCtor())),
  stringLiteral: <T extends string>(v: T) => new JsonSchema<T>(right(LiteralTypeCtor(v))),
  keysOf: _keys => new JsonSchema(right(StringTypeCtor({ enum: Object.keys(_keys) }))),
  nullable: ({ schema }) => new JsonSchema(either.either.map(schema, x => optional(x.json))),
  array: ({ schema }) => new JsonSchema(either.either.chain(schema, ArrayTypeCtor))
}
