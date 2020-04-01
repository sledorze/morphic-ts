import * as options from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean, Ord } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { OrdType, OrdURI } from '../hkt'
import { eqStrict } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter: ModelAlgebraPrimitive1<OrdURI> = {
  _F: OrdURI,
  date: _ => _env => new OrdType(ord.contramap(ordNumber, (date: Date) => date.getTime())),
  boolean: _ => _env => new OrdType(ordBoolean),
  string: _ => _env => new OrdType(ordString),
  number: _ => _env => new OrdType(ordNumber),
  bigint: _ => _env => new OrdType({ equals: strictEqual, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
  stringLiteral: k => _env => new OrdType(ordString as Ord<typeof k>),
  keysOf: _keys => _env => new OrdType(ord.contramap(ordString, k => k as string)),
  nullable: getOrd => env => new OrdType(options.getOrd(getOrd(env).ord)),
  array: getOrd => env => new OrdType(getArrayOrd(getOrd(env).ord))
}
