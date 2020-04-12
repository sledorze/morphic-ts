import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { anything } from 'fast-check'
import { applyCustomize } from './common'

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  _F: FastCheckURI,
  unknown: () => _env => new FastCheckType(anything()),
  unknownCfg: configs => env => new FastCheckType(applyCustomize(configs)(anything(), env))
}
