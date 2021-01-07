import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { getOrd as AgetOrd } from 'fp-ts/Array'
import { ord } from 'fp-ts/Ord'
import { toArray } from 'fp-ts/Set'

import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const ordSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<OrdURI, Env> => ({
    _F: OrdURI,
    set: (getOrd, ordA, config) => env =>
      new OrdType(ordApplyConfig(config)(ord.contramap(AgetOrd(getOrd(env).ord), toArray(ordA)), env, {}))
  })
)
