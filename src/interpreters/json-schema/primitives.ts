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

export const jsonSchemaPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new JsonSchema(StringTypeCtor({ format: 'date' })),
  string: new JsonSchema(StringTypeCtor({})),
  number: new JsonSchema(NumberTypeCtor()),
  boolean: new JsonSchema(BooleanTypeCtor()),
  stringLiteral: <T extends string>(v: T) => new JsonSchema<T>(LiteralTypeCtor(v)),
  keysOf: _keys => new JsonSchema(StringTypeCtor({ enum: Object.keys(_keys) })),
  nullable: ({ schema }) => new JsonSchema(optional(schema.json)),
  array: ({ schema }) => new JsonSchema(ArrayTypeCtor(schema))
}
