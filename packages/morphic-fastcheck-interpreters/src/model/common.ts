import { FastCheckURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary } from 'fast-check'

export interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}

export const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity
