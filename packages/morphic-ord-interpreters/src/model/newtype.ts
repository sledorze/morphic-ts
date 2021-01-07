import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import type { Ord } from 'fp-ts/lib/Ord'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

const coerce = <N extends AnyNewtype>(e: Ord<NewtypeA<N>>): Ord<N> => e as Ord<N>
/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<OrdURI, Env> => ({
    _F: OrdURI,
    newtype: () => (getOrd, config) => env => new OrdType(ordApplyConfig(config)(coerce(getOrd(env).ord), env, {}))
  })
)
