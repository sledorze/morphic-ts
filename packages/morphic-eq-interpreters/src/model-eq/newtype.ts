import { ModelAlgebraNewtype1 } from '@morphic/model-algebras/lib/newtype'
import { EqURI } from '..'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter: ModelAlgebraNewtype1<EqURI> = {
  _F: EqURI,
  newtype: () => identity as any
}
