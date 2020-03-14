import { IoTsURI, IOTSType } from '../hkt'
import { ModelAlgebraTerm2 } from '@morphic-ts/model-algebras/lib/term'
import * as t from 'io-ts'

declare module '@morphic-ts/model-algebras/lib/term' {
  interface TermConstructor<A, E> {
    [IoTsURI]: t.Type<A, E>
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsTermInterpreter: ModelAlgebraTerm2<IoTsURI> = {
  _F: IoTsURI,
  term: () => ({ [IoTsURI]: codec }) => new IOTSType(codec)
}
