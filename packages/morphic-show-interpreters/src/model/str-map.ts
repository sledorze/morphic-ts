import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<ShowURI, Env> => ({
    _F: ShowURI,
    strMap: codomain => env => new ShowType(record.getShow(codomain(env).show)),
    strMapCfg: codomain => config => env =>
      new ShowType(showApplyConfig(config)(record.getShow(codomain(env).show), env))
  })
)
