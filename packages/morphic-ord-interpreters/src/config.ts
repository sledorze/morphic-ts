import { getApplyConfig } from '@morphic-ts/common/lib/config'
import { OrdURI } from './hkt'
export * from './model'
export {
  /**
   *  @since 0.0.1
   */
  OrdURI
}
/**
 *  @since 0.0.1
 */
export const ordApplyConfig = getApplyConfig(OrdURI)
