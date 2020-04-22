import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { fromNullable } from 'fp-ts/lib/Option'
import { constant, integer, boolean, string, float, oneof, array, option, bigInt } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const fastCheckPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    date: _env => new FastCheckType(integer().map(n => new Date(n))),
    dateCfg: configs => env =>
      new FastCheckType(
        fastCheckApplyConfig(configs)(
          integer().map(n => new Date(n)),
          env
        )
      ),
    boolean: _env => new FastCheckType(boolean()),
    booleanCfg: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(boolean(), env)),
    string: _env => new FastCheckType(string()),
    stringCfg: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(string(), env)),
    number: _env => new FastCheckType(float()),
    numberCfg: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(float(), env)),
    bigint: _env => new FastCheckType(bigInt()),
    bigintCfg: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(bigInt(), env)),
    stringLiteral: l => _env => new FastCheckType(constant(l)),
    stringLiteralCfg: l => config => env => new FastCheckType(fastCheckApplyConfig(config)(constant(l), env)),
    keysOf: k => _env => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant))),
    keysOfCfg: k => config => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant)), env)
      ),
    nullable: T => env => new FastCheckType(option(T(env).arb).map(fromNullable)),
    nullableCfg: T => config => env =>
      new FastCheckType(fastCheckApplyConfig(config)(option(T(env).arb).map(fromNullable), env)),
    array: T => env => new FastCheckType(array(T(env).arb)),
    arrayCfg: T => config => env => new FastCheckType(fastCheckApplyConfig(config)(array(T(env).arb), env))
  })
)
