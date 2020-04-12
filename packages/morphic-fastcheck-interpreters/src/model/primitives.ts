import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { fromNullable } from 'fp-ts/lib/Option'
import { constant, integer, boolean, string, float, oneof, array, option, bigInt } from 'fast-check'
import { applyCustomize } from './common'

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
  date: () => _env => new FastCheckType(integer().map(n => new Date(n))),
  dateCfg: configs => env =>
    new FastCheckType(
      applyCustomize(configs)(
        integer().map(n => new Date(n)),
        env
      )
    ),
  boolean: () => _env => new FastCheckType(boolean()),
  booleanCfg: configs => env => new FastCheckType(applyCustomize(configs)(boolean(), env)),
  string: () => _env => new FastCheckType(string()),
  stringCfg: configs => env => new FastCheckType(applyCustomize(configs)(string(), env)),
  number: () => _env => new FastCheckType(float()),
  numberCfg: configs => env => new FastCheckType(applyCustomize(configs)(float(), env)),
  bigint: () => _env => new FastCheckType(bigInt()),
  bigintCfg: configs => env => new FastCheckType(applyCustomize(configs)(bigInt(), env)),
  stringLiteral: l => _env => new FastCheckType(constant(l)),
  stringLiteralCfg: (l, _config) => _env => new FastCheckType(constant(l)), // TODO: add customize
  keysOf: k => _env => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant))),
  keysOfCfg: (k, _config) => _env => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant))), // TODO: add customize
  nullable: T => env => new FastCheckType(option(T(env).arb).map(fromNullable)),
  nullableCfg: T => _config => env => new FastCheckType(option(T(env).arb).map(fromNullable)), // TODO: add customize
  array: T => env => new FastCheckType(array(T(env).arb)),
  arrayCfg: T => _config => env => {
    // TODO: add customize
    const config = _config !== undefined ? _config[FastCheckURI] : undefined
    return new FastCheckType(
      config !== undefined ? array(T(env).arb, config.minLength ?? 0, config.maxLength) : array(T(env).arb)
    )
  }
}
