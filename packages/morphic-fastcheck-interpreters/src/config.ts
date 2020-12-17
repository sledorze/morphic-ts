import { getApplyConfig } from '@morphic-ts/common/lib/config'

import { FastCheckURI } from './hkt'

export * from './model'
export {
  /**
   *  @since 0.0.1
   */
  FastCheckURI
}
/**
 *  @since 0.0.1
 */
export const fastCheckApplyConfig = getApplyConfig(FastCheckURI)
