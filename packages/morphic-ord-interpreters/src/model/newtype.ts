import { ModelAlgebraNewtype1 } from '@sledorze/morphic-model-algebras/lib/newtype'
import { OrdURI } from '..'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter: ModelAlgebraNewtype1<OrdURI> = {
  _F: OrdURI,
  newtype: () => identity as any
}
