import { genConfig, getApplyConfig } from '@morphic-ts/common/lib/config'
import { JsonSchemaURI } from './hkt'
export * from './model'
export { JsonSchemaURI }
/**
 * Helper to build a Morph config
 * F.string(config(x => x))
 *
 * Beware that this kind of Helper will not infer correctly in combinators taking another Morph as parameter (array, nullable, etc..)
 *
 *  @since 0.0.1
 */
export const jsonSchemaConfig = genConfig(JsonSchemaURI)
export const jsonSchemaApplyConfig = getApplyConfig(JsonSchemaURI)
