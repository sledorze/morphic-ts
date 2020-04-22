import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { IoTsURI } from './hkt'
export * from './model' // to thread type level augmentations
export { IoTsURI }
/**
 *  @since 0.0.1
 */
export const iotsConfig = genConfig(IoTsURI)
export const iotsApplyConfig = getApplyConfig(IoTsURI)
