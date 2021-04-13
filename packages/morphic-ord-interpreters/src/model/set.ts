import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/function'
import type { Ord } from 'fp-ts/Ord'
import { ord as ord_ } from 'fp-ts/Ord'
import { getOrd as AgetOrd } from 'fp-ts/ReadonlyArray'
import { toReadonlyArray } from 'fp-ts/ReadonlySet'

import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ordSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<OrdURI, Env> => ({
    _F: OrdURI,
    set: (getOrd, ordA, config) => env =>
      pipe(
        getOrd(env).ord,
        ord =>
          new OrdType(ordApplyConfig(config?.conf)(ord_.contramap(AgetOrd(ord), toReadonlyArray(ordA)), env, { ord }))
      )
  })
)
