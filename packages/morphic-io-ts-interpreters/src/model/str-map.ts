import { record, string } from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  _F: IoTsURI,
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
