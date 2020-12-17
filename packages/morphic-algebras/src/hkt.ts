import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export interface Algebra<F, Env> {
  _AF: F
  _ENV: Env
}
/**
 *  @since 0.0.1
 */
export interface Algebra1<F extends URIS, Env extends AnyEnv> {
  _AF: F
  _ENV: Env
}
/**
 *  @since 0.0.1
 */
export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
  _AF: F
  _ENV: Env
}
/**
 *  @since 0.0.1
 */
export type AlgebraURIS = Exclude<keyof Algebra<never, never>, '_AF' | '_ENV'>
