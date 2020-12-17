import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { getEq as RgetEq } from 'fp-ts/Record'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<EqURI, Env> => ({
    _F: EqURI,
    strMap: (getCodomain, config) => env => new EqType(eqApplyConfig(config)(RgetEq(getCodomain(env).eq), env)),
    record: (_getDomain, getCodomain, config) => env =>
      new EqType(eqApplyConfig(config)(RgetEq(getCodomain(env).eq), env)) // domain is always comparable (this is handled by record Eq)
  })
)
