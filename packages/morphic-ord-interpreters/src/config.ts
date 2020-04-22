import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { OrdURI } from './hkt'
export * from './model'
export { OrdURI }
/**
 * Helper to build a Morph config
 * F.string(config(x => x))
 *
 * Beware that this kind of Helper will not infer correctly in combinators taking another Morph as parameter (array, nullable, etc..)
 *
 *  @since 0.0.1
 */
export const ordConfig = genConfig(OrdURI)
export const ordApplyConfig = getApplyConfig(OrdURI)
