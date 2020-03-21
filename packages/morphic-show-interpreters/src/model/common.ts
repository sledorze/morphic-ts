import { ShowURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { Show } from 'fp-ts/lib/Show'

export interface Customize<A> {
  (a: Show<A>): Show<A>
}

export const applyCustomize = <A>(c: { [ShowURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[ShowURI] ?? identity : identity
