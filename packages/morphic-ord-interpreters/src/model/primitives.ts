import * as options from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { OrdType, OrdURI } from '../hkt'
import { eqStrict } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter: ModelAlgebraPrimitive1<OrdURI> = {
  _F: OrdURI,
  date: _ => _env => new OrdType(ord.contramap(ordNumber, date => date.getTime())),
  boolean: _ => _env => new OrdType(ordBoolean),
  string: _ => _env => new OrdType(ordString),
  number: _ => _env => new OrdType(ordNumber),
  bigint: _ => _env =>
    new OrdType<bigint>({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
  stringLiteral: k => _env => new OrdType<typeof k>(ordString),
  keysOf: keys => _env => new OrdType<keyof typeof keys>(ord.contramap(ordString, k => k as string)),
  // TODO: add customize
  nullable: getOrd => _config => env => new OrdType(options.getOrd(getOrd(env).ord)),
  // TODO: add customize
  array: getOrd => _config => env => new OrdType(getArrayOrd(getOrd(env).ord))
}
