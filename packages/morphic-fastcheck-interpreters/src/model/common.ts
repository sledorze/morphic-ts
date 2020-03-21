import { FastCheckURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary } from 'fast-check'

/**
 *  @since 0.0.1
 */
export interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}

/**
 *  @since 0.0.1
 */
export const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity
