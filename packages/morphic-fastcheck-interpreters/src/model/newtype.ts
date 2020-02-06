import { FastCheckURI } from '..'
import { ModelAlgebraNewtype1 } from 'morphic-model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

declare module 'morphic-algebras/lib/hkt' {}

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter: ModelAlgebraNewtype1<FastCheckURI> = {
  _F: FastCheckURI,
  newtype: () => identity as any
}
