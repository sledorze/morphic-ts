import { Arbitrary } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const FastCheckURI = 'FastCheckURI' as const
/**
 *  @since 0.0.1
 */
export type FastCheckURI = typeof FastCheckURI

/**
 *  @since 0.0.1
 */
export class FastCheckType<R, A> {
  _R!: R
  _A!: A
  _URI!: FastCheckURI
  constructor(public arb: Arbitrary<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [FastCheckURI]: FastCheckType<R, A>
  }
}
