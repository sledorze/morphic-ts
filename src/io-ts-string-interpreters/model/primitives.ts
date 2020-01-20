import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSStringType, IoTsStringURI } from '..'
import { ModelAlgebraPrimitive2 } from '../../model-algebras/primitives'

export const ioTsStringPrimitiveInterpreter: ModelAlgebraPrimitive2<IoTsStringURI> = {
  date: _ => new IOTSStringType(DateFromISOString),
  boolean: _ => new IOTSStringType(t.boolean),
  string: _ => new IOTSStringType(t.string),
  number: _ => new IOTSStringType(t.number),
  stringLiteral: l => new IOTSStringType(t.literal(l, l)),
  keysOf: (k, name) => new IOTSStringType<string, keyof typeof k>(t.keyof(k, name) as any), // TODO: not pretty but output
  nullable: T => new IOTSStringType(optionFromNullable(T.type)),
  array: T => new IOTSStringType(t.array(T.type))
}
