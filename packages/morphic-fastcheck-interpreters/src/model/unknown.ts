import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { anything } from 'fast-check'
import { fastCheckApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  _F: FastCheckURI,
  unknown: _env => new FastCheckType(anything()),
  unknownCfg: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(anything(), env))
}
