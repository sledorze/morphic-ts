import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraPrimitive2 } from '../../algebras/primitives'
import { constant } from 'fp-ts/lib/function'

export const ioTsStringPrimitiveInterpreter: ModelAlgebraPrimitive2<URI> = {
  date: new IOTSStringType(constant(DateFromISOString)),
  boolean: new IOTSStringType(constant(t.boolean)),
  string: new IOTSStringType(constant(t.string)),
  number: new IOTSStringType(constant(t.number)),
  stringLiteral: l => new IOTSStringType(constant(t.literal(l))),
  keysOf: k => new IOTSStringType<string, keyof typeof k>(constant(t.keyof(k) as any)), // TODO: not pretty but output
  nullable: T => new IOTSStringType(constant(optionFromNullable(T.type()))),
  array: T => new IOTSStringType(constant(t.array(T.type())))
}
