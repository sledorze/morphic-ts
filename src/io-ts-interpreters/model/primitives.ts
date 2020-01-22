import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraPrimitive2 } from '../../model-algebras/primitives'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {
  interface PrimitiveConfig {
    [IoTsURI]: Customize<string, string> | undefined
  }
  export interface PrimitiveDateConfig {
    [IoTsURI]: Customize<string, Date> | undefined
  }
  export interface PrimitiveStringConfig {
    [IoTsURI]: Customize<string, string> | undefined
  }
  export interface PrimitiveNumberConfig {
    [IoTsURI]: Customize<number, number> | undefined
  }
  export interface PrimitiveBooleanConfig {
    [IoTsURI]: Customize<boolean, boolean> | undefined
  }
  export interface PrimitiveArrayConfig2<E, A> {
    [IoTsURI]: Customize<E[], A[]> | undefined
  }
}

interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive2<IoTsURI> = {
  date: config => new IOTSType(applyCustomize(config)(DateFromISOString)),
  boolean: config => new IOTSType(applyCustomize(config)(t.boolean)),
  string: config => new IOTSType(applyCustomize(config)(t.string)),
  number: config => new IOTSType(applyCustomize(config)(t.number)),
  stringLiteral: l => new IOTSType(t.literal(l, l)),
  keysOf: (k, name) => new IOTSType<string, keyof typeof k>(t.keyof(k, name) as any), // TODO: not pretty but output
  nullable: T => new IOTSType(optionFromNullable(T.type)),
  array: (T, config) => new IOTSType(applyCustomize(config)(t.array(T.type)))
}
