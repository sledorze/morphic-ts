import { ShowURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { Show } from 'fp-ts/lib/Show'

/**
 *  @since 0.0.1
 */
export interface Customize<RC, A> {
  (a: Show<A>, env: RC): Show<A>
}

/**
 *  @since 0.0.1
 */
export const applyCustomize = <A, RC>(c: { [ShowURI]?: Customize<RC, A> } | undefined) =>
  c !== undefined ? c[ShowURI] ?? identity : identity
