import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/algebras/lib/hkt' {
  interface UnknownConfig {
    [IoTsURI]: Customize<unknown, unknown> | undefined
  }
}

interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  _F: IoTsURI,
  unknown: config => new IOTSType(applyCustomize(config)(t.unknown))
}
