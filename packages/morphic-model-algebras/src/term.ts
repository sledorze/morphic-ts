import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ByInterp, isOptionalConfig } from '@morphic-ts/common/lib/core'
import { TermConfig } from '@morphic-ts/algebras/lib/hkt'

/**
 *  @since 0.0.1
 */
export const TermURI = 'TermURI' as const
/**
 *  @since 0.0.1
 */
export type TermURI = typeof TermURI

declare module '@morphic-ts/algebras/lib/hkt' {
  interface Algebra<F> {
    [TermURI]: ModelAlgebraTerm<F>
  }
  interface Algebra1<F extends URIS> {
    [TermURI]: ModelAlgebraTerm1<F>
  }
  interface Algebra2<F extends URIS2> {
    [TermURI]: ModelAlgebraTerm2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface TermConfig<E, A> {}
}

// @ts-ignore
export interface TermConstructor<A, E> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm<F> {
  _F: F
  term: {
    <A, E>(name: string): (a: TermConstructor<A, E>) => isOptionalConfig<TermConfig<E, A>, HKT2<F, E, A>>
    <A, E>(name: string): (a: TermConstructor<A, E>, config: ByInterp<TermConfig<E, A>, URIS | URIS2>) => HKT2<F, E, A>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm1<F extends URIS> {
  _F: F
  term<A>(name: string): (a: TermConstructor<A, unknown>, config?: ByInterp<TermConfig<unknown, A>, F>) => Kind<F, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm2<F extends URIS2> {
  _F: F
  term<A, E>(name: string): (a: TermConstructor<A, E>, config: ByInterp<TermConfig<E, A>, F>) => Kind2<F, E, A>
}
