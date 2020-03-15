import * as t from 'io-ts'
import { IoTsURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

export interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

export const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity
