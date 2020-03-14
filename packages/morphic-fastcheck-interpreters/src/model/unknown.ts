import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { anything } from 'fast-check'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  interface UnknownConfig {
    [FastCheckURI]: Customize<unknown> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  _F: FastCheckURI,
  unknown: configs => new FastCheckType(applyCustomize(configs)(anything()))
}
