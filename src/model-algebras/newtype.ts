import { URIS2, Kind2, URIS, Kind, HKT2 } from '../common/HKT'
import { ByInterp, isOptionalConfig } from '../common/core'
import { NewtypeConfig } from '../algebras/hkt'
import { Newtype } from 'newtype-ts'

export const NewtypeURI = Symbol()
export type NewtypeURI = typeof NewtypeURI

declare module '../algebras/hkt' {
  interface Algebra<F> {
    [NewtypeURI]: ModelAlgebraNewtype<F>
  }
  interface Algebra1<F extends URIS> {
    [NewtypeURI]: ModelAlgebraNewtype1<F>
  }
  interface Algebra2<F extends URIS2> {
    [NewtypeURI]: ModelAlgebraNewtype2<F>
  }

  export interface NewtypeConfig {}
}
export type AnyNewtype = Newtype<any, any>
export type NewtypeA<N extends AnyNewtype> = N extends Newtype<any, infer A> ? A : never

export interface ModelAlgebraNewtype<F> {
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(
    a: HKT2<F, E, NewtypeA<N>>
  ) => isOptionalConfig<NewtypeConfig, HKT2<F, NewtypeA<N>, N>, 'Requiring some config via newtype({ <Interp>: ...  })'>
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(a: HKT2<F, E, NewtypeA<N>>, config: ByInterp<NewtypeConfig, URIS | URIS2>) => HKT2<F, E, N>
}

export interface ModelAlgebraNewtype1<F extends URIS> {
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(a: Kind<F, NewtypeA<N>>, config?: ByInterp<NewtypeConfig, F>) => Kind<F, N>
}

export interface ModelAlgebraNewtype2<F extends URIS2> {
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(a: Kind2<F, E, NewtypeA<N>>, config: ByInterp<NewtypeConfig, F>) => Kind2<F, E, N>
}
