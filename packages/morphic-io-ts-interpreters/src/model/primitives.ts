import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraPrimitive2 } from '@morphic-ts/model-algebras/lib/primitives'
import { either } from 'fp-ts/lib/Either'

import { iotsApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export interface BigIntStringC extends t.Type<bigint, string, unknown> {}
/**
 *  @since 0.0.1
 */

export const BigIntString: BigIntStringC = new t.Type<bigint, string, unknown>(
  'BigIntString',
  // tslint:disable-next-line: strict-type-predicates valid-typeof
  (u): u is bigint => u !== undefined && u !== null && typeof u === 'bigint',
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      try {
        const d = BigInt(s)
        return t.success(d)
      } catch {
        return t.failure(u, c)
      }
    }),
  a => a.toString(10)
)

/**
 *  @since 0.0.1
 */
/* istanbul ignore next */
export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive2<IoTsURI> = {
  _F: IoTsURI,
  date: _env => new IOTSType(DateFromISOString),
  dateCfg: config => env => new IOTSType(iotsApplyConfig(config)(DateFromISOString, env)),
  boolean: _env => new IOTSType(t.boolean),
  booleanCfg: config => env => new IOTSType(iotsApplyConfig(config)(t.boolean, env)),
  string: _env => new IOTSType(t.string),
  stringCfg: config => env => new IOTSType(iotsApplyConfig(config)(t.string, env)),
  number: _env => new IOTSType(t.number),
  numberCfg: config => env => new IOTSType(iotsApplyConfig(config)(t.number, env)),
  bigint: _env => new IOTSType(BigIntString),
  bigintCfg: config => env => new IOTSType(iotsApplyConfig(config)(BigIntString, env)),
  stringLiteral: l => _env => new IOTSType(t.literal(l, l)),
  stringLiteralCfg: l => config => env => new IOTSType(iotsApplyConfig(config)(t.literal(l, l), env)),
  keysOf: k => _env => new IOTSType(t.keyof(k) as t.Type<keyof typeof k, string, unknown>),
  keysOfCfg: k => config => env =>
    new IOTSType(iotsApplyConfig(config)(t.keyof(k) as t.Type<keyof typeof k, string, unknown>, env)),
  nullable: T => env => new IOTSType(optionFromNullable(T(env).type)),
  nullableCfg: T => config => env => new IOTSType(iotsApplyConfig(config)(optionFromNullable(T(env).type), env)),
  array: T => env => new IOTSType(t.array(T(env).type)),
  arrayCfg: T => config => env => new IOTSType(iotsApplyConfig(config)(t.array(T(env).type), env))
}
