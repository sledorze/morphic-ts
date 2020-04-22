import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { OrdURI } from './hkt'
export * from './model'
export { OrdURI }
/**
 *  @since 0.0.1
 */
export const ordConfig = genConfig(OrdURI)
export const ordApplyConfig = getApplyConfig(OrdURI)
