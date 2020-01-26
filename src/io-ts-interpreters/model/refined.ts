import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraRefined2 } from '../../model-algebras/refined'

export const ioTsRefinedInterpreter: ModelAlgebraRefined2<IoTsURI> = {
  refined: (a, ref, name) => new IOTSType(t.brand(a.type, ref, name))
}
