import { ModelAlgebraNewtype1 } from '../../model-algebras/newtype'
import { EqURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const eqNewtypeInterpreter: ModelAlgebraNewtype1<EqURI> = {
  newtype: () => identity as any
}
