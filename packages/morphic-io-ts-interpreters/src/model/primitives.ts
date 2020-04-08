import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraPrimitive2 } from '@morphic-ts/model-algebras/lib/primitives'
import { either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig<RC> {
    [IoTsURI]: Customize<RC, string, Date> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig<RC> {
    [IoTsURI]: Customize<RC, string, string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig<RC> {
    [IoTsURI]: Customize<RC, number, number> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig<RC> {
    [IoTsURI]: Customize<RC, string, bigint> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig<RC> {
    [IoTsURI]: Customize<RC, boolean, boolean> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E[], A[]> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveKeysOfConfig<RC, K> {
    [IoTsURI]: Customize<RC, string, K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveStringLiteralConfig<RC, K> {
    [IoTsURI]: Customize<RC, string, K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveNullableConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E | null, Option<A>> | undefined
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

/**
 *  @since 0.0.1
 */
/* istanbul ignore next */
export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive2<IoTsURI> = {
  _F: IoTsURI,
  date: config => env => new IOTSType(applyCustomize(config)(DateFromISOString, env)),
  boolean: config => env => new IOTSType(applyCustomize(config)(t.boolean, env)),
  string: config => env => new IOTSType(applyCustomize(config)(t.string, env)),
  number: config => env => new IOTSType(applyCustomize(config)(t.number, env)),
  bigint: config => env => new IOTSType(applyCustomize(config)(BigIntString, env)),
  stringLiteral: (l, config) => env => new IOTSType(applyCustomize(config)(t.literal(l, l), env)),
  keysOf: (k, config) => env =>
    new IOTSType(applyCustomize(config)(t.keyof(k) as t.Type<keyof typeof k, string, unknown>, env)),
  nullable: T => config => env => new IOTSType(applyCustomize(config)(optionFromNullable(T(env).type), env)),
  array: T => config => env => new IOTSType(applyCustomize(config)(t.array(T(env).type), env))
}
