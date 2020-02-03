import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraPrimitive2 } from '@sledorze/morphic-model-algebras/lib/primitives'
import { identity } from 'fp-ts/lib/function'
import { either } from 'fp-ts/lib/Either'

declare module '@sledorze/morphic-algebras/lib/hkt' {
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
  export interface PrimitiveBigIntConfig {
    [IoTsURI]: Customize<string, bigint> | undefined
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

export interface BigIntStringC extends t.Type<bigint, string, unknown> {}
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

export const ioTsPrimitiveInterpreter: ModelAlgebraPrimitive2<IoTsURI> = {
  _F: IoTsURI,
  date: config => new IOTSType(applyCustomize(config)(DateFromISOString)),
  boolean: config => new IOTSType(applyCustomize(config)(t.boolean)),
  string: config => new IOTSType(applyCustomize(config)(t.string)),
  number: config => new IOTSType(applyCustomize(config)(t.number)),
  bigint: config => new IOTSType(applyCustomize(config)(BigIntString)),
  stringLiteral: l => new IOTSType(t.literal(l, l)),
  keysOf: k => new IOTSType<string, keyof typeof k>(t.keyof(k) as any), // TODO: not pretty but output
  nullable: T => new IOTSType(optionFromNullable(T.type)),
  array: (T, config) => new IOTSType(applyCustomize(config)(t.array(T.type)))
}
