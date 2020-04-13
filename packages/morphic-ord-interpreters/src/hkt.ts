import type { Ord } from 'fp-ts/lib/Ord'

/**
 *  @since 0.0.1
 */
export const OrdURI = 'OrdURI' as const

/**
 *  @since 0.0.1
 */
export type OrdURI = typeof OrdURI

declare module '@morphic-ts/common/lib/config' {
  export interface ConfigType<E, A> {
    [OrdURI]: Ord<A>
  }
}

/**
 *  @since 0.0.1
 */
export class OrdType<A> {
  _A!: A
  _URI!: OrdURI
  constructor(public ord: Ord<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [OrdURI]: (env: R) => OrdType<A>
  }
}
