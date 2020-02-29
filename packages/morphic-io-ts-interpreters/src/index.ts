import * as t from 'io-ts'
import { genConfig } from '@morphic-ts/common/lib/core'

/**
 *  @since 0.0.1
 */
export const IoTsURI = 'IoTsURI' as const
/**
 *  @since 0.0.1
 */
export type IoTsURI = typeof IoTsURI

/**
 *  @since 0.0.1
 */
export class IOTSType<O, A> {
  _A!: A
  _E!: O
  _URI!: IoTsURI
  constructor(public type: t.Type<A, O>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind2<E, A> {
    [IoTsURI]: IOTSType<E, A>
  }
}

/**
 *  @since 0.0.1
 */
export const iotsConfig = genConfig(IoTsURI)
