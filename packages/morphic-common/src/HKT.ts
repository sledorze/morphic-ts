/**
 * @file Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */
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
