import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const RecursiveURI = Symbol()
/**
 *  @since 0.0.1
 */
export type RecursiveURI = typeof RecursiveURI

declare module '@morphic/algebras/lib/hkt' {
  interface Algebra<F> {
    [RecursiveURI]: ModelAlgebraRecursive<F>
  }
  interface Algebra1<F extends URIS> {
    [RecursiveURI]: ModelAlgebraRecursive1<F>
  }
  interface Algebra2<F extends URIS2> {
    [RecursiveURI]: ModelAlgebraRecursive2<F>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive<F> {
  _F: F
  recursive: <L, A>(a: (x: HKT2<F, L, A>) => HKT2<F, L, A>, name: string) => HKT2<F, L, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive1<F extends URIS> {
  _F: F
  recursive: <A>(a: (x: Kind<F, A>) => Kind<F, A>, name: string) => Kind<F, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive2<F extends URIS2> {
  _F: F
  recursive: <L, A>(a: (x: Kind2<F, L, A>) => Kind2<F, L, A>, name: string) => Kind2<F, L, A>
}
