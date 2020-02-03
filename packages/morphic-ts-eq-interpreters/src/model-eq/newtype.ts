import { ModelAlgebraNewtype1 } from '@sledorze/morphic-ts-model-algebras/lib/newtype'
import { EqURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const eqNewtypeInterpreter: ModelAlgebraNewtype1<EqURI> = {
  _F: EqURI,
  newtype: () => identity as any
}
