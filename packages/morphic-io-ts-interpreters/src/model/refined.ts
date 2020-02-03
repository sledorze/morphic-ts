import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraRefined2 } from '@sledorze/morphic-model-algebras/lib/refined'

export const ioTsRefinedInterpreter: ModelAlgebraRefined2<IoTsURI> = {
  _F: IoTsURI,
  refined: (a, ref, name) => new IOTSType(t.brand(a.type, ref, name))
}
