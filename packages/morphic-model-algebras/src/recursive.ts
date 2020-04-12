import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const RecursiveURI = 'RecursiveURI' as const
/**
 *  @since 0.0.1
 */
export type RecursiveURI = typeof RecursiveURI

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive<F> {
  _F: F
  recursive: <R, L, A>(a: (x: HKT2<F, R, L, A>) => HKT2<F, R, L, A>, name: string) => HKT2<F, R, L, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive1<F extends URIS> {
  _F: F
  recursive: <A, R>(a: (x: Kind<F, R, A>) => Kind<F, R, A>, name: string) => Kind<F, R, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive2<F extends URIS2> {
  _F: F
  recursive: <R, L, A>(a: (x: Kind2<F, R, L, A>) => Kind2<F, R, L, A>, name: string) => Kind2<F, R, L, A>
}
