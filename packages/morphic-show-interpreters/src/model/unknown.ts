import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown1<ShowURI, Env> => ({
    _F: ShowURI,
    unknown: _env => new ShowType({ show: (_any: any) => '<unknown>' }),
    unknownCfg: _ => _env => new ShowType({ show: (_any: any) => '<unknown>' })
  })
)
