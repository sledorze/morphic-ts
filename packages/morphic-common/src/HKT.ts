/**
 * @file Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */
/**
 * `* -> *` constructors
 * @since 0.0.1
 */
export interface HKT<URI, R, A> {
  readonly _URI: URI
  (_R: R): void
  readonly _A: A
}
/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export interface HKT2<URI, R, E, A> extends HKT<URI, R, A> {
  readonly _E: E
}

/**
 * `* -> *` constructors
 * @since 0.0.1
 */
export interface URItoKind<R, A> {
  _R: R
  _A: A
}
/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export interface URItoKind2<R, E, A> {
  _R: R
  _A: A
  _E: E
}

/**
 * `* -> *` constructors
 * @since 0.0.1
 */
export declare type URIS = Exclude<keyof URItoKind<any, any>, '_A' | '_R'>
/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export declare type URIS2 = Exclude<keyof URItoKind2<any, any, any>, '_A' | '_E' | '_R'>

/**
 * `* -> *` constructors
 * @since 0.0.1
 */
export declare type Kind<URI extends URIS, R, A> = URI extends URIS ? URItoKind<R, A>[URI] : any

/**
 * `* -> * -> *` constructors
 * @since 0.0.1
 */
export declare type Kind2<URI extends URIS2, R, E, A> = URI extends URIS2 ? URItoKind2<R, E, A>[URI] : any
