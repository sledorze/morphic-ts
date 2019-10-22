/**
 * @file Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */
/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT2<URI, E, A> extends HKT<URI, A> {
  readonly _E: E
}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT3<URI, R, E, A> extends HKT2<URI, E, A> {
  readonly _R: R
}
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT4<URI, S, R, E, A> extends HKT3<URI, R, E, A> {
  readonly _S: S
}
/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind<A> {
  _A: A
}
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind2<E, A> {
  _E: E
}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind3<R, E, A> {
  _R: R
}
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind4<S, R, E, A> {
  _S: S
}
/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export declare type URIS = Exclude<keyof URItoKind<any>, '_A'>
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export declare type URIS2 = Exclude<keyof URItoKind2<any, any>, '_E'>
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export declare type URIS3 = Exclude<keyof URItoKind3<any, any, any>, '_R'>
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export declare type URIS4 = Exclude<keyof URItoKind4<any, any, any, any>, '_S'>
/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export declare type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any
/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export declare type Kind2<URI extends URIS2, E, A> = URI extends URIS2 ? URItoKind2<E, A>[URI] : any
/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export declare type Kind3<URI extends URIS3, R, E, A> = URI extends URIS3 ? URItoKind3<R, E, A>[URI] : any
/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export declare type Kind4<URI extends URIS4, S, R, E, A> = URI extends URIS4 ? URItoKind4<S, R, E, A>[URI] : any
