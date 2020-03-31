import * as t from 'io-ts'
import { IoTsURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

export type NoEnv = unknown

/**
 *  @since 0.0.1
 */
export interface Customize<RC, E, A> {
  (a: t.Type<A, E, unknown>, env: RC): t.Type<A, E, unknown>
}

/**
 *  @since 0.0.1
 */
export const applyCustomize = <RC, E, A>(c: { [IoTsURI]?: Customize<RC, E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity
