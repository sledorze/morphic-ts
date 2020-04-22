import { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'
import { AnyEnv } from '@morphic-ts/common/lib/config'

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
export type AlgebraURIS = keyof Algebra<never, never>
