import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraPrimitive1 } from '../../model-algebras/primitives'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {
  interface PrimitiveConfig {
    [IoTsURI]: Customize<string> | undefined
  }
  export interface PrimitiveDateConfig {
    [IoTsURI]: Customize<Date> | undefined
  }
  export interface PrimitiveStringConfig {
    [IoTsURI]: Customize<string> | undefined
  }
  export interface PrimitiveNumberConfig {
    [IoTsURI]: Customize<number> | undefined
  }
  export interface PrimitiveBooleanConfig {
    [IoTsURI]: Customize<boolean> | undefined
  }
  export interface PrimitiveArrayConfig<A> {
    [IoTsURI]: Customize<A[]> | undefined
  }
}

interface Customize<A> {
  (a: t.Type<A, unknown, unknown>): t.Type<A, unknown, unknown>
}

const applyCustomize = <A>(c: { [IoTsURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive1<IoTsURI> = {
  date: config => new IOTSType(applyCustomize(config)(DateFromISOString)),
  boolean: config => new IOTSType(applyCustomize(config)(t.boolean)),
  string: config => new IOTSType(applyCustomize(config)(t.string)),
  number: config => new IOTSType(applyCustomize(config)(t.number)),
  stringLiteral: l => new IOTSType(t.literal(l, l)),
  keysOf: (k, name) => new IOTSType(t.keyof(k, name)),
  nullable: T => new IOTSType(optionFromNullable(T.type)),
  array: (T, config) => new IOTSType(applyCustomize(config)(t.array(T.type)))
}
