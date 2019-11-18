import * as options from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { OrdType, URI } from '.'

export const ordPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: _ => new OrdType(ord.contramap(ordNumber, (date: Date) => date.getTime())),
  boolean: _ => new OrdType(ordBoolean),
  string: _ => new OrdType(ordString),
  number: _ => new OrdType(ordNumber),
  stringLiteral: <T extends string>(_: T) => new OrdType<T>(ordString),
  keysOf: _keys => new OrdType(ord.contramap(ordString, k => k as string)),
  nullable: ({ ord }) => new OrdType(options.getOrd(ord)),
  array: ({ ord }) => new OrdType(getArrayOrd(ord))
}
