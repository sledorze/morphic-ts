import { genConfig } from '@morphic-ts/common/lib/config'
import { JsonSchemaURI } from './hkt'
export * from './model'

/**
 *  @since 0.0.1
 */
export const jsonSchemaConfig = genConfig(JsonSchemaURI)
