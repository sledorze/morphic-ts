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
  _A: A
  _E: E
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
export declare type URIS2 = Exclude<keyof URItoKind2<any, any>, '_A' | '_E'>

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
