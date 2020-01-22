import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraPrimitive2 } from '../../model-algebras/primitives'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {
  interface PrimitiveConfig {
    [IoTs2URI]: Customize<string, string> | undefined
  }
  export interface PrimitiveDateConfig {
    [IoTs2URI]: Customize<string, Date> | undefined
  }
  export interface PrimitiveStringConfig {
    [IoTs2URI]: Customize<string, string> | undefined
  }
  export interface PrimitiveNumberConfig {
    [IoTs2URI]: Customize<number, number> | undefined
  }
  export interface PrimitiveBooleanConfig {
    [IoTs2URI]: Customize<boolean, boolean> | undefined
  }
  export interface PrimitiveArrayConfig2<E, A> {
    [IoTs2URI]: Customize<E[], A[]> | undefined
  }
}

interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

const applyCustomize = <E, A>(c: { [IoTs2URI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTs2URI] ?? identity : identity

export const ioTs2PrimitiveInterpreter: ModelAlgebraPrimitive2<IoTs2URI> = {
  date: config => new IOTS2Type(applyCustomize(config)(DateFromISOString)),
  boolean: config => new IOTS2Type(applyCustomize(config)(t.boolean)),
  string: config => new IOTS2Type(applyCustomize(config)(t.string)),
  number: config => new IOTS2Type(applyCustomize(config)(t.number)),
  stringLiteral: l => new IOTS2Type(t.literal(l, l)),
  keysOf: (k, name) => new IOTS2Type<string, keyof typeof k>(t.keyof(k, name) as any), // TODO: not pretty but output
  nullable: T => new IOTS2Type(optionFromNullable(T.type)),
  array: (T, config) => new IOTS2Type(applyCustomize(config)(t.array(T.type)))
}
