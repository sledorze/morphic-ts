import { ModelAlgebraNewtype2 } from '@morphic-ts/model-algebras/lib/newtype'
import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/algebras/lib/hkt' {
  interface NewtypeConfig<E, A> {
    [IoTsURI]: Customize<E, A> | undefined
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
export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  _F: IoTsURI,
  newtype: () => (a, config) => new IOTSType(applyCustomize(config)(a.type as any))
}
