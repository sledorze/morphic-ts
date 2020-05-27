import { FastCheckType, FastCheckURI } from '../hkt'
import type { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { anything } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    unknown: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(anything(), env))
  })
)
