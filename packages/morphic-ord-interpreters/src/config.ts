import { genConfig } from '@morphic-ts/common/lib/core'
import { OrdURI } from './hkt'
export * from './model'

/**
 *  @since 0.0.1
 */
export const ordConfig = genConfig(OrdURI)
