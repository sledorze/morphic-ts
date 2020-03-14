import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { fromNullable } from 'fp-ts/lib/Option'
import { constant, integer, boolean, string, float, oneof, array, option, bigInt } from 'fast-check'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  interface PrimitiveArrayConfig<A> {
    [FastCheckURI]: MinMaxLength | undefined
  }
  interface PrimitiveConfig {
    [FastCheckURI]: Customize<string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig {
    [FastCheckURI]: Customize<Date> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig {
    [FastCheckURI]: Customize<string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig {
    [FastCheckURI]: Customize<number> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig {
    [FastCheckURI]: Customize<boolean> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig {
    [FastCheckURI]: Customize<bigint> | undefined
  }
}

interface MinMaxLength {
  maxLength: number
  minLength?: number
}

/**
 *  @since 0.0.1
 */
export const fastCheckPrimitiveInterpreter: ModelAlgebraPrimitive1<FastCheckURI> = {
  _F: FastCheckURI,
  date: configs => new FastCheckType(applyCustomize(configs)(integer().map(n => new Date(n)))),
  boolean: configs => new FastCheckType(applyCustomize(configs)(boolean())),
  string: configs => new FastCheckType(applyCustomize(configs)(string())),
  number: configs => new FastCheckType(applyCustomize(configs)(float())),
  bigint: configs => new FastCheckType(applyCustomize(configs)(bigInt())),
  stringLiteral: l => new FastCheckType(constant(l)),
  keysOf: k => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant))),
  nullable: T => new FastCheckType(option(T.arb).map(fromNullable)),
  array: (T, configs) => {
    const config = configs !== undefined ? configs[FastCheckURI] : undefined
    return new FastCheckType(
      config !== undefined ? array(T.arb, config.minLength ?? 0, config.maxLength) : array(T.arb)
    )
  }
}
