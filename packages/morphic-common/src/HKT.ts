/**
 * @file Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */

import type { ConfigType } from './config'

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export interface HKT<R, E, A> {
  readonly _R: (_: R) => void
  readonly _A: A
  readonly _E: E
}

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export interface URItoKind<R, E, A> {
  readonly _R: (_: R) => void
  readonly _A: A
  readonly _E: E

  readonly ['HKT']: HKT<R, E, A>
}

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export declare type URIS = Exclude<keyof URItoKind<any, any, any>, '_A' | '_E' | '_R'>

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export declare type URIS_ = Exclude<URIS, 'HKT'>

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export declare type Kind<URI extends URIS, R, E, A> = URItoKind<R, E, A>[URI]

/**
 * The URIS to Index ConfigType
 * @since 0.0.1
 */
export type ConfigTypeURIS = keyof ConfigType<any, any>

/**
 * Helper to resolve a ConfigType for a particular URI(s)
 * @since 0.0.1
 */
export type ConfigTypeKind<URI extends ConfigTypeURIS, E, A> = ConfigType<E, A>[URI]
