import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, URI } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'

declare module '../../algebras/hkt' {}

const constDate = new IOTSType(DateFromISOString)
const constBoolean = new IOTSType(t.boolean)
const constString = new IOTSType(t.string)
const constNumber = new IOTSType(t.number)

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: _ => constDate,
  boolean: _ => constBoolean,
  string: _ => constString,
  number: _ => constNumber,
  stringLiteral: l => new IOTSType(t.literal(l, l)),
  keysOf: (k, name) => new IOTSType(t.keyof(k, name)),
  nullable: T => new IOTSType(optionFromNullable(T.type)),
  array: T => new IOTSType(t.array(T.type))
}
