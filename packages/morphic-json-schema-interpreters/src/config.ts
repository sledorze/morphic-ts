import { genConfig } from '@morphic-ts/common/lib/core'
import { JsonSchemaURI } from './hkt'
export * from './model'

/**
 *  @since 0.0.1
 */
export const jsonSchemaConfig = genConfig(JsonSchemaURI)
