import type { Arbitrary } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const FastCheckURI = 'FastCheckURI' as const
/**
 *  @since 0.0.1
 */
export type FastCheckURI = typeof FastCheckURI

declare module '@morphic-ts/common/lib/config' {
  export interface ConfigType<E, A> {
    [FastCheckURI]: Arbitrary<A>
  }
}

/**
 *  @since 0.0.1
 */
export class FastCheckType<A> {
  _A!: A
  _URI!: FastCheckURI
  constructor(public arb: Arbitrary<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [FastCheckURI]: (env: R) => FastCheckType<A>
  }
}
