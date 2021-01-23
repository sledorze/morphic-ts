import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import { either } from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { either as Teither } from 'io-ts-types/lib/either'
import { option as Toption } from 'io-ts-types/lib/option'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { readonlyNonEmptyArray } from 'io-ts-types/lib/readonlyNonEmptyArray'
import { UUID } from 'io-ts-types/lib/UUID'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [IoTsURI]: {
      left: t.Type<EA, EE>
      right: t.Type<AA, AE>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
}

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

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }
}

/**
 *  @since 0.0.1
 */
/* istanbul ignore next */
export const ioTsPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<IoTsURI, Env> => ({
    _F: IoTsURI,
    date: config => env => new IOTSType(iotsApplyConfig(config)(DateFromISOString, env, {})),
    boolean: config => env => new IOTSType(iotsApplyConfig(config)(t.boolean, env, {})),
    string: config => env => new IOTSType(iotsApplyConfig(config)(t.string, env, {})),
    number: config => env => new IOTSType(iotsApplyConfig(config)(t.number, env, {})),
    bigint: config => env => new IOTSType(iotsApplyConfig(config)(BigIntString, env, {})),
    stringLiteral: (l, config) => env => new IOTSType(iotsApplyConfig(config)(t.literal(l, l), env, {})),
    numberLiteral: (l, config) => env => new IOTSType(iotsApplyConfig(config)(t.literal(l, `${l}`), env, {})),
    oneOfLiterals: (l, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.union(l.map(_ => t.literal(_)) as any), env, {})),
    // oneOfLiterals: (l, config) => env => new IOTSType(iotsApplyConfig(config)(t.keyof(makeObj(l)), env, {})),
    tag: (l, config) => env => new IOTSType(iotsApplyConfig(config)(tag(l), env, {})),
    keysOf: (k, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.keyof(k) as t.Type<keyof typeof k, string, unknown>, env, {})),
    nullable: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(optionFromNullable(type), env, { type }))),
    optional: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(t.union([type, t.undefined]), env, { type }))),
    mutable: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(type, env, { type }))),
    array: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(t.readonlyArray(type), env, { type }))),
    nonEmptyArray: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(readonlyNonEmptyArray(type), env, { type }))),
    uuid: config => env => new IOTSType(iotsApplyConfig(config)(UUID, env, {})),
    either: (e, a, config) => env =>
      ((left, right) => new IOTSType(iotsApplyConfig(config)(Teither(left, right), env, { left, right })))(
        e(env).type,
        a(env).type
      ),
    option: (T, config) => env =>
      pipe(T(env).type, type => new IOTSType(iotsApplyConfig(config)(Toption(type), env, { type }))),
    unknownE: (a, config) => env => new IOTSType(iotsApplyConfig(config)(a(env).type, env, {}))
  })
)
