import type { Ord } from 'fp-ts/lib/Ord'

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
  _TYPE!: Ord<A>
  constructor(public ord: Ord<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [OrdURI]: (env: R) => OrdType<A>
  }
}
