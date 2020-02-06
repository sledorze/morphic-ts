import { Ord } from 'fp-ts/lib/Ord'
import { genConfig } from '@morphic/common/lib/core'

/**
 *  @since 0.0.1
 */
export const OrdURI = Symbol()

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

declare module '@morphic/common/lib/HKT' {
  interface URItoKind<A> {
    [OrdURI]: OrdType<A>
  }
}

/**
 *  @since 0.0.1
 */
export const ordConfig = genConfig(OrdURI)
