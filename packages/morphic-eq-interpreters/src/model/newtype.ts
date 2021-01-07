import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import type { Eq } from 'fp-ts/lib/Eq'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

const coerce = <N extends AnyNewtype>(e: Eq<NewtypeA<N>>): Eq<N> => e as Eq<N>
/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<EqURI, Env> => ({
    _F: EqURI,
    newtype: () => (getEq, config) => env => new EqType(eqApplyConfig(config)(coerce(getEq(env).eq), env, {}))
  })
)
