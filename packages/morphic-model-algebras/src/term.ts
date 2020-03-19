import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'

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
}

/**
 *  @since 0.0.1
 */
// @ts-ignore
export interface TermConstructor<A, E> {}

/**
 *  @since 0.0.1
 */
export type TermConstructorByInterp<F extends URIS | URIS2, A, E> = {
  [k in keyof TermConstructor<A, E> & F]: TermConstructor<A, E>[k]
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm<F> {
  _F: F
  term: {
    <A, E>(name: string, a: TermConstructorByInterp<URIS | URIS2, A, E>): HKT2<F, E, A>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm1<F extends URIS> {
  _F: F
  term<A>(name: string, a: TermConstructorByInterp<F, A, unknown>): Kind<F, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTerm2<F extends URIS2> {
  _F: F
  term<A, E>(name: string, a: TermConstructorByInterp<F, A, E>): Kind2<F, E, A>
}
