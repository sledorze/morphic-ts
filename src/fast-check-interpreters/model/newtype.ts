import { FastCheckURI } from '..'
import { ModelAlgebraNewtype1 } from '../../model-algebras/newtype'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {}

export const fastCheckNewtypeInterpreter: ModelAlgebraNewtype1<FastCheckURI> = {
  newtype: () => identity as any
}
