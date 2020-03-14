import { IoTsURI, IOTSType } from '../hkt'
import { ModelAlgebraTerm2 } from '@morphic-ts/model-algebras/lib/term'
import * as t from 'io-ts'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/model-algebras/lib/term' {
  interface TermConstructor<A, E> {
    [IoTsURI]: t.Type<A, E>
  }
}

declare module '@morphic-ts/algebras/lib/hkt' {
  interface TermConfig<E, A> {
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
export const ioTsTermInterpreter: ModelAlgebraTerm2<IoTsURI> = {
  _F: IoTsURI,
  term: () => ({ [IoTsURI]: codec }, config) => new IOTSType(applyCustomize(config)(codec))
}
