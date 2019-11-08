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
import { constant } from 'fp-ts/lib/function'

export const jsonSchemaPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new JsonSchema(constant(StringTypeCtor({ format: 'date' }))),
  string: new JsonSchema(constant(StringTypeCtor({}))),
  number: new JsonSchema(constant(NumberTypeCtor())),
  boolean: new JsonSchema(constant(BooleanTypeCtor())),
  stringLiteral: <T extends string>(v: T) => new JsonSchema<T>(constant(LiteralTypeCtor(v))),
  keysOf: _keys => new JsonSchema(constant(StringTypeCtor({ enum: Object.keys(_keys) }))),
  nullable: ({ schema }) => new JsonSchema(() => optional(schema().json)),
  array: ({ schema }) => new JsonSchema(() => ArrayTypeCtor(schema()))
}
