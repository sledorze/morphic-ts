import { IoTsURI } from '..'
import { ModelAlgebraNewtype2 } from '@sledorze/morphic-model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  _F: IoTsURI,
  newtype: () => identity as any
}
