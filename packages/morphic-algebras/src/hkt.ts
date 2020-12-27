import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export interface Algebra<F extends URIS, Env extends AnyEnv> {
  _AF: F
  _ENV: Env
}
/**
 *  @since 0.0.1
 */
export type AlgebraURIS = Exclude<keyof Algebra<never, never>, '_AF' | '_ENV'>
