import { URIS, URIS2 } from '@morphic/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export interface Algebra<F> {
  _AF: F
}
/**
 *  @since 0.0.1
 */
export interface Algebra1<F extends URIS> {
  _AF: F
}
/**
 *  @since 0.0.1
 */
export interface Algebra2<F extends URIS2> {
  _AF: F
}
/**
 *  @since 0.0.1
 */
export type AlgebraURIS = keyof Algebra<never>
