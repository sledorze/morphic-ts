import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { EqURI } from './hkt'
export * from './model' // to thread type level augmentations
export { EqURI }
/**
 * Helper to build a Morph config
 * F.string(config(x => x))
 *
 * Beware that this kind of Helper will not infer correctly in combinators taking another Morph as parameter (array, nullable, etc..)
 *
 * @since 0.0.1
 */
export const eqConfig = genConfig(EqURI)
export const eqApplyConfig = getApplyConfig(EqURI)
