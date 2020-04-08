import { FastCheckURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary } from 'fast-check'

/**
 *  @since 0.0.1
 */
export interface Customize<RC, A> {
  (a: Arbitrary<A>, env: RC): Arbitrary<A>
}

/**
 *  @since 0.0.1
 */
export const applyCustomize = <A, RC>(c: { [FastCheckURI]?: Customize<RC, A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity
