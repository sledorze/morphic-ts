import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraPrimitive2 } from '../../algebras/primitives'

export const ioTsStringPrimitiveInterpreter: ModelAlgebraPrimitive2<URI> = {
  date: new IOTSStringType(DateFromISOString),
  boolean: new IOTSStringType(t.boolean),
  string: new IOTSStringType(t.string),
  number: new IOTSStringType(t.number),
  stringLiteral: l => new IOTSStringType(t.literal(l)),
  keysOf: k => new IOTSStringType<string, keyof typeof k>(t.keyof(k) as any), // TODO: not pretty but output
  nullable: T => new IOTSStringType(optionFromNullable(T.type)),
  array: T => new IOTSStringType(t.array(T.type))
}
