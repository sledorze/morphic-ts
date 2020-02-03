import { URIS2, Kind2, URIS, Kind, HKT2 } from '@sledorze/morphic-ts-common/lib/HKT'
import { ByInterp, isOptionalConfig } from '@sledorze/morphic-ts-common/lib/core'
import { Refinedfig } from '@sledorze/morphic-ts-algebras/lib/hkt'
import { Branded } from 'io-ts' // TODO: remove that dependency
import { Refinement } from 'fp-ts/lib/function'

export const RefinedURI = Symbol()
export type RefinedURI = typeof RefinedURI

declare module '@sledorze/morphic-ts-algebras/lib/hkt' {
  interface Algebra<F> {
    [RefinedURI]: ModelAlgebraRefined<F>
  }
  interface Algebra1<F extends URIS> {
    [RefinedURI]: ModelAlgebraRefined1<F>
  }
  interface Algebra2<F extends URIS2> {
    [RefinedURI]: ModelAlgebraRefined2<F>
  }

  export interface Refinedfig {}
}

export interface ModelAlgebraRefined<F> {
  _F: F
  refined: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): isOptionalConfig<Refinedfig, HKT2<F, E, Branded<A, B>>>
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N,
      config: ByInterp<Refinedfig, URIS | URIS2>
    ): HKT2<F, E, Branded<A, B>>
  }
}

export interface ModelAlgebraRefined1<F extends URIS> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<Refinedfig, F>
  ): Kind<F, Branded<A, B>>
}

export interface ModelAlgebraRefined2<F extends URIS2> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<Refinedfig, F>
  ): Kind2<F, E, Branded<A, B>>
}
