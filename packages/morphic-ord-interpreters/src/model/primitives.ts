import * as options from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { OrdType, OrdURI } from '../hkt'
import { eqStrict } from 'fp-ts/lib/Eq'
import { ordApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<OrdURI, Env> => ({
    _F: OrdURI,
    date: _env => new OrdType(ord.contramap(ordNumber, date => date.getTime())),
    dateCfg: config => env =>
      new OrdType(
        ordApplyConfig(config)(
          ord.contramap(ordNumber, date => date.getTime()),
          env
        )
      ),
    boolean: _env => new OrdType(ordBoolean),
    booleanCfg: config => env => new OrdType(ordApplyConfig(config)(ordBoolean, env)),
    string: _env => new OrdType(ordString),
    stringCfg: config => env => new OrdType(ordApplyConfig(config)(ordString, env)),
    number: _env => new OrdType(ordNumber),
    numberCfg: config => env => new OrdType(ordApplyConfig(config)(ordNumber, env)),
    bigint: _env => new OrdType<bigint>({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }),
    bigintCfg: config => env =>
      new OrdType<bigint>(
        ordApplyConfig(config)({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }, env)
      ),
    stringLiteral: k => _env => new OrdType<typeof k>(ordString),
    stringLiteralCfg: k => config => env => new OrdType<typeof k>(ordApplyConfig(config)(ordString, env)),
    keysOf: keys => _env => new OrdType<keyof typeof keys>(ord.contramap(ordString, k => k as string)),
    keysOfCfg: keys => config => env =>
      new OrdType<keyof typeof keys>(
        ordApplyConfig(config)(
          ord.contramap(ordString, k => k as string),
          env
        )
      ),
    nullable: getOrd => env => new OrdType(options.getOrd(getOrd(env).ord)),
    nullableCfg: getOrd => config => env => new OrdType(ordApplyConfig(config)(options.getOrd(getOrd(env).ord), env)),
    array: getOrd => env => new OrdType(getArrayOrd(getOrd(env).ord)),
    arrayCfg: getOrd => config => env => new OrdType(ordApplyConfig(config)(getArrayOrd(getOrd(env).ord), env))
  })
)
