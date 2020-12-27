import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { getEq as SgetEq } from 'fp-ts/Set'

import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<EqURI, Env> => ({
    _F: EqURI,
    set: getEq => env => new EqType(SgetEq(getEq(env).eq))
  })
)
