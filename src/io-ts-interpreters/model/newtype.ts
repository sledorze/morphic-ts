import { IoTsURI } from '..'
import { ModelAlgebraNewtype2 } from '../../model-algebras/newtype'
import { identity } from 'fp-ts/lib/function'

export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  newtype: () => identity as any
}
