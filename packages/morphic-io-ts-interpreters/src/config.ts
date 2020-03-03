import { genConfig } from '@morphic-ts/common/lib/core'
import { IoTsURI } from '.'
export * from './model' // to thread type level augmentations

/**
 *  @since 0.0.1
 */
export const iotsConfig = genConfig(IoTsURI)
