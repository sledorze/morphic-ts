import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { EqURI } from '.'
export * from './model' // to thread type level augmentations

/**
 *  @since 0.0.1
 */
export const eqConfig = genConfig(EqURI)
export const eqApplyConfig = getApplyConfig(EqURI)

console.log('genConfig ', genConfig)
console.log('eqConfig ', eqConfig)
