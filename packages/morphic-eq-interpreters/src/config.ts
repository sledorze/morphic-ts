import { genConfig } from '@morphic-ts/common/lib/core'
import { EqURI } from '.'
export * from './model-eq' // to thread type level augmentations

/**
 *  @since 0.0.1
 */
export const eqConfig = genConfig(EqURI)
