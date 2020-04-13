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
  date: () => _env => new OrdType(ord.contramap(ordNumber, date => date.getTime())),
  dateCfg: _ => _env => new OrdType(ord.contramap(ordNumber, date => date.getTime())),
  boolean: () => _env => new OrdType(ordBoolean),
  booleanCfg: _ => _env => new OrdType(ordBoolean),
  string: () => _env => new OrdType(ordString),
  stringCfg: _ => _env => new OrdType(ordString),
  number: () => _env => new OrdType(ordNumber),
  numberCfg: _ => _env => new OrdType(ordNumber),
  bigint: () => _env =>
    new OrdType<bigint>({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
  bigintCfg: _ => _env =>
    new OrdType<bigint>({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
  stringLiteral: k => _env => new OrdType<typeof k>(ordString),
  stringLiteralCfg: k => _config => _env => new OrdType<typeof k>(ordString),
  keysOf: keys => _env => new OrdType<keyof typeof keys>(ord.contramap(ordString, k => k as string)),
  keysOfCfg: keys => _config => _env => new OrdType<keyof typeof keys>(ord.contramap(ordString, k => k as string)),
  // TODO: add customize
  nullable: getOrd => env => new OrdType(options.getOrd(getOrd(env).ord)),
  // TODO: add customize
  nullableCfg: getOrd => _config => env => new OrdType(options.getOrd(getOrd(env).ord)),
  // TODO: add customize
  array: getOrd => env => new OrdType(getArrayOrd(getOrd(env).ord)),
  arrayCfg: getOrd => _config => env => new OrdType(getArrayOrd(getOrd(env).ord))
}
