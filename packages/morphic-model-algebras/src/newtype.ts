import { URIS2, Kind2, URIS, Kind, HKT2 } from 'morphic-common/lib/HKT'
import { ByInterp, isOptionalConfig } from 'morphic-common/lib/core'
import { NewtypeConfig } from 'morphic-algebras/lib/hkt'
import { Newtype } from 'newtype-ts'

/**
 *  @since 0.0.1
 */
export const NewtypeURI = Symbol()
/**
 *  @since 0.0.1
 */
export type NewtypeURI = typeof NewtypeURI

declare module 'morphic-algebras/lib/hkt' {
  interface Algebra<F> {
    [NewtypeURI]: ModelAlgebraNewtype<F>
  }
  interface Algebra1<F extends URIS> {
    [NewtypeURI]: ModelAlgebraNewtype1<F>
  }
  interface Algebra2<F extends URIS2> {
    [NewtypeURI]: ModelAlgebraNewtype2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface NewtypeConfig {}
}
/**
 *  @since 0.0.1
 */
export type AnyNewtype = Newtype<any, any>
/**
 *  @since 0.0.1
 */
export type NewtypeA<N extends AnyNewtype> = N extends Newtype<any, infer A> ? A : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype<F> {
  _F: F
  newtype: {
    <N extends AnyNewtype = never>(name: string): <E>(
      a: HKT2<F, E, NewtypeA<N>>
    ) => isOptionalConfig<NewtypeConfig, HKT2<F, NewtypeA<N>, N>>
    <N extends AnyNewtype = never>(name: string): <E>(
      a: HKT2<F, E, NewtypeA<N>>,
      config: ByInterp<NewtypeConfig, URIS | URIS2>
    ) => HKT2<F, E, N>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype1<F extends URIS> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): (a: Kind<F, NewtypeA<N>>, config?: ByInterp<NewtypeConfig, F>) => Kind<F, N>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype2<F extends URIS2> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(a: Kind2<F, E, NewtypeA<N>>, config: ByInterp<NewtypeConfig, F>) => Kind2<F, E, N>
}
