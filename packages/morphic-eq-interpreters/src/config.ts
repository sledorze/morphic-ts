import { getApplyConfig } from '@morphic-ts/common/lib/config'
import { EqURI } from './hkt'
export * from './model' // to thread type level augmentations
export {
  /**
   *  @since 0.0.1
   */
  EqURI
}
/**
 * @since 0.0.1
 */
export const eqApplyConfig = getApplyConfig(EqURI)
