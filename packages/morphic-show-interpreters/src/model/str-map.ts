import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { getShow as RgetShow } from 'fp-ts/Record'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<ShowURI, Env> => ({
    _F: ShowURI,
    strMap: (codomain, config) => env => new ShowType(showApplyConfig(config)(RgetShow(codomain(env).show), env, {})),
    record: (_domain, codomain, config) => env =>
      new ShowType(showApplyConfig(config)(RgetShow(codomain(env).show), env, {}))
  })
)
