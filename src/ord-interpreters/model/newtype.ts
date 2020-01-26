import { ModelAlgebraNewtype1 } from '../../model-algebras/newtype'
import { OrdURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const ordNewtypeInterpreter: ModelAlgebraNewtype1<OrdURI> = {
  newtype: () => identity as any
}
