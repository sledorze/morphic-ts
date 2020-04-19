import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { FastCheckURI } from './hkt'
export * from './model'
/**
 *  @since 0.0.1
 */
export const fastCheckConfig = genConfig(FastCheckURI)
export const fastCheckApplyConfig = getApplyConfig(FastCheckURI)
