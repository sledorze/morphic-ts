import { IoTsURI } from '..'
import { ModelAlgebraNewtype2 } from 'morphic-model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  _F: IoTsURI,
  newtype: () => identity as any
}
