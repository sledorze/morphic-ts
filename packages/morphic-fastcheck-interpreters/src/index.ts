import { Arbitrary } from 'fast-check'
import { genConfig } from '@sledorze/morphic-common/lib/core'

/**
 *  @since 0.0.1
 */
export const FastCheckURI = Symbol()
/**
 *  @since 0.0.1
 */
export type FastCheckURI = typeof FastCheckURI

/**
 *  @since 0.0.1
 */
export class FastCheckType<A> {
  _A!: A
  _URI!: FastCheckURI
  constructor(public arb: Arbitrary<A>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind<A> {
    [FastCheckURI]: FastCheckType<A>
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckConfig = genConfig(FastCheckURI)
