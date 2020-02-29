import { Ord } from 'fp-ts/lib/Ord'
import { genConfig } from '@morphic-ts/common/lib/core'

/**
 *  @since 0.0.1
 */
export const OrdURI = 'OrdURI' as const

/**
 *  @since 0.0.1
 */
export type OrdURI = typeof OrdURI

/**
 *  @since 0.0.1
 */
export class OrdType<A> {
  _A!: A
  _URI!: OrdURI
  constructor(public ord: Ord<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<A> {
    [OrdURI]: OrdType<A>
  }
}

/**
 *  @since 0.0.1
 */
export const ordConfig = genConfig(OrdURI)
