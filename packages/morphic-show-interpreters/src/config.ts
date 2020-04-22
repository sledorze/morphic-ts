import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { ShowURI } from './hkt'
export * from './model'
export { ShowURI }
/**
 *  @since 0.0.1
 */
export const showConfig = genConfig(ShowURI)
export const showApplyConfig = getApplyConfig(ShowURI)
