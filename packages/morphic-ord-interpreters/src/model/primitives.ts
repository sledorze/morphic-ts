import * as options from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from 'morphic-model-algebras/lib/primitives'
import { OrdType, OrdURI } from '..'
import { strictEqual } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter: ModelAlgebraPrimitive1<OrdURI> = {
  _F: OrdURI,
  date: _ => new OrdType(ord.contramap(ordNumber, (date: Date) => date.getTime())),
  boolean: _ => new OrdType(ordBoolean),
  string: _ => new OrdType(ordString),
  number: _ => new OrdType(ordNumber),
  bigint: _ => new OrdType({ equals: strictEqual, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
  stringLiteral: <T extends string>(_: T) => new OrdType<T>(ordString),
  keysOf: _keys => new OrdType(ord.contramap(ordString, k => k as string)),
  nullable: ({ ord }) => new OrdType(options.getOrd(ord)),
  array: ({ ord }) => new OrdType(getArrayOrd(ord))
}
