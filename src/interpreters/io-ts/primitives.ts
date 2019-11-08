import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, URI } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new IOTSType(DateFromISOString),
  boolean: new IOTSType(t.boolean),
  string: new IOTSType(t.string),
  number: new IOTSType(t.number),
  stringLiteral: l => new IOTSType(t.literal(l)),
  keysOf: k => new IOTSType(t.keyof(k)),
  nullable: T => new IOTSType(optionFromNullable(T.type)),
  array: T => new IOTSType(t.array(T.type))
}
