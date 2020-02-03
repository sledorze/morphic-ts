import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraPrimitive1 } from '@sledorze/morphic-model-algebras/lib/primitives'
import { fromNullable } from 'fp-ts/lib/Option'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary, constant, integer, boolean, string, float, oneof, array, option, bigInt } from 'fast-check'

declare module '@sledorze/morphic-algebras/lib/hkt' {
  interface PrimitiveArrayConfig<A> {
    [FastCheckURI]: MinMaxLength | undefined
  }
  interface PrimitiveConfig {
    [FastCheckURI]: Customize<string> | undefined
  }
  export interface PrimitiveDateConfig {
    [FastCheckURI]: Customize<Date> | undefined
  }
  export interface PrimitiveStringConfig {
    [FastCheckURI]: Customize<string> | undefined
  }
  export interface PrimitiveNumberConfig {
    [FastCheckURI]: Customize<number> | undefined
  }
  export interface PrimitiveBooleanConfig {
    [FastCheckURI]: Customize<boolean> | undefined
  }
  export interface PrimitiveBigIntConfig {
    [FastCheckURI]: Customize<bigint> | undefined
  }
}

interface MinMaxLength {
  maxLength: number
  minLength?: number
}
interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}

const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity

export const fastCheckPrimitiveInterpreter: ModelAlgebraPrimitive1<FastCheckURI> = {
  _F: FastCheckURI,
  date: configs => new FastCheckType(applyCustomize(configs)(integer().map(n => new Date(n)))),
  boolean: configs => new FastCheckType(applyCustomize(configs)(boolean())),
  string: configs => new FastCheckType(applyCustomize(configs)(string())),
  number: configs => new FastCheckType(applyCustomize(configs)(float())),
  bigint: configs => new FastCheckType(applyCustomize(configs)(bigInt())),
  stringLiteral: l => new FastCheckType(constant(l)),
  keysOf: k => new FastCheckType(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(k => constant(k)))),
  nullable: T => new FastCheckType(option(T.arb).map(fromNullable)),
  array: (T, configs) => {
    const config = configs !== undefined ? configs[FastCheckURI] : undefined
    return new FastCheckType(
      config !== undefined ? array(T.arb, config.minLength ?? 0, config.maxLength) : array(T.arb)
    )
  }
}
