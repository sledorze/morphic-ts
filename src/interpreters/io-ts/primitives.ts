import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, URI } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { constant } from 'fp-ts/lib/function'

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new IOTSType(constant(DateFromISOString)),
  boolean: new IOTSType(constant(t.boolean)),
  string: new IOTSType(constant(t.string)),
  number: new IOTSType(constant(t.number)),
  stringLiteral: l => new IOTSType(constant(t.literal(l))),
  keysOf: k => new IOTSType(constant(t.keyof(k))),
  nullable: T => new IOTSType(() => optionFromNullable(T.type())),
  array: T => new IOTSType(() => t.array(T.type()))
}
