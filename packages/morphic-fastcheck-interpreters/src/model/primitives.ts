import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { fromNullable } from 'fp-ts/lib/Option'
import { constant, integer, boolean, string, float, oneof, array, option, bigInt } from 'fast-check'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<RC, E, A> {
    [FastCheckURI]: MinMaxLength | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig<RC> {
    [FastCheckURI]: Customize<Date> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig<RC> {
    [FastCheckURI]: Customize<string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig<RC> {
    [FastCheckURI]: Customize<number> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig<RC> {
    [FastCheckURI]: Customize<boolean> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig<RC> {
    [FastCheckURI]: Customize<bigint> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export interface MinMaxLength {
  maxLength: number
  minLength?: number
}

/**
 *  @since 0.0.1
 */
export const fastCheckPrimitiveInterpreter: ModelAlgebraPrimitive1<FastCheckURI> = {
  _F: FastCheckURI,
  date: configs => _env => new FastCheckType(applyCustomize(configs)(integer().map(n => new Date(n)))),
  boolean: configs => _env => new FastCheckType(applyCustomize(configs)(boolean())),
  string: configs => _env => new FastCheckType(applyCustomize(configs)(string())),
  number: configs => _env => new FastCheckType(applyCustomize(configs)(float())),
  bigint: configs => _env => new FastCheckType(applyCustomize(configs)(bigInt())),
  stringLiteral: l => _env => new FastCheckType(constant(l)),
  keysOf: k => _env => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant))),
  nullable: T => env => new FastCheckType(option(T(env).arb).map(fromNullable)),
  array: (T, configs) => env => {
    const config = configs !== undefined ? configs[FastCheckURI] : undefined
    return new FastCheckType(
      config !== undefined ? array(T(env).arb, config.minLength ?? 0, config.maxLength) : array(T(env).arb)
    )
  }
}
