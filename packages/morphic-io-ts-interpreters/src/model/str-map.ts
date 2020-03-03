import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [IoTsURI]: Customize<L, A> | undefined
  }
}

interface Customize<L, A> {
  (a: t.RecordC<t.StringC, t.Type<A, L, unknown>>): t.RecordC<t.StringC, t.Type<A, L, unknown>>
}

const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  _F: IoTsURI,
  strMap: (codomain, config) => new IOTSType(applyCustomize(config)(t.record(t.string, codomain.type)))
}
