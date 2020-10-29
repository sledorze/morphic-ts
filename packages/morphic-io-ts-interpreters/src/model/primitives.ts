import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '../hkt'
import type { ModelAlgebraPrimitive2 } from '@morphic-ts/model-algebras/lib/primitives'
import { either } from 'fp-ts/Either'

import { iotsApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import { UUID } from 'io-ts-types/lib/UUID'
import { either as Teither } from 'io-ts-types/lib/either'
import { option as Toption } from 'io-ts-types/lib/option'
import { nonEmptyArray } from 'io-ts-types/lib/nonEmptyArray'

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

const tag = <S extends string>(s: S): t.Type<S, undefined, unknown> =>
  new t.Type(
    s,
    (u: unknown): u is S => u === s,
    (_i, _c) => t.success(s),
    _a => undefined
  )

/**
 *  @since 0.0.1
 */
/* istanbul ignore next */
export const ioTsPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive2<IoTsURI, Env> => ({
    _F: IoTsURI,
    date: config => env => new IOTSType(iotsApplyConfig(config)(DateFromISOString, env)),
    boolean: config => env => new IOTSType(iotsApplyConfig(config)(t.boolean, env)),
    string: config => env => new IOTSType(iotsApplyConfig(config)(t.string, env)),
    number: config => env => new IOTSType(iotsApplyConfig(config)(t.number, env)),
    bigint: config => env => new IOTSType(iotsApplyConfig(config)(BigIntString, env)),
    stringLiteral: (l, config) => env => new IOTSType(iotsApplyConfig(config)(t.literal(l, l), env)),
    tag: (l, config) => env => new IOTSType(iotsApplyConfig(config)(tag(l), env)),
    keysOf: (k, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.keyof(k) as t.Type<keyof typeof k, string, unknown>, env)),
    nullable: (T, config) => env => new IOTSType(iotsApplyConfig(config)(optionFromNullable(T(env).type), env)),
    array: (T, config) => env => new IOTSType(iotsApplyConfig(config)(t.array(T(env).type), env)),
    nonEmptyArray: (T, config) => env => new IOTSType(iotsApplyConfig(config)(nonEmptyArray(T(env).type), env)),
    uuid: config => env => new IOTSType(iotsApplyConfig(config)(UUID, env)),
    either: (e, a, config) => env => new IOTSType(iotsApplyConfig(config)(Teither(e(env).type, a(env).type), env)),
    option: (a, config) => env => new IOTSType(iotsApplyConfig(config)(Toption(a(env).type), env))
  })
)
