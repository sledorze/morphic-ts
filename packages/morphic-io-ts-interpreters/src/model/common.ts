import * as t from 'io-ts'
import { IoTsURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

/**
 *  @since 0.0.1
 */
export const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity
