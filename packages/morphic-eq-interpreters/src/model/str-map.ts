import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<EqURI, Env> => ({
    _F: EqURI,
    strMap: getCodomain => env => new EqType(record.getEq(getCodomain(env).eq)),
    strMapCfg: getCodomain => config => env => new EqType(eqApplyConfig(config)(record.getEq(getCodomain(env).eq), env))
  })
)
