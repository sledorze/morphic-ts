import { getEq as SgetEq } from 'fp-ts/lib/Set'
import type { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { EqType, EqURI } from '../hkt'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<EqURI, Env> => ({
    _F: EqURI,
    set: getEq => env => new EqType(SgetEq(getEq(env).eq))
  })
)
