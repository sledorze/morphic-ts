import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraUnknown2 } from '../../model-algebras/unknown'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {
  interface UnknownConfig {
    [IoTsURI]: Customize<unknown, unknown> | undefined
  }
}

interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  unknown: config => new IOTSType(applyCustomize(config)(t.unknown))
}
