import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraPrimitive2 } from '../../model-algebras/primitives'

export const ioTs2PrimitiveInterpreter: ModelAlgebraPrimitive2<IoTs2URI> = {
  date: _ => new IOTS2Type(DateFromISOString),
  boolean: _ => new IOTS2Type(t.boolean),
  string: _ => new IOTS2Type(t.string),
  number: _ => new IOTS2Type(t.number),
  stringLiteral: l => new IOTS2Type(t.literal(l, l)),
  keysOf: (k, name) => new IOTS2Type<string, keyof typeof k>(t.keyof(k, name) as any), // TODO: not pretty but output
  nullable: T => new IOTS2Type(optionFromNullable(T.type)),
  array: T => new IOTS2Type(t.array(T.type))
}
