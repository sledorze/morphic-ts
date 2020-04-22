import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { ShowType, ShowURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const asPartial = <T>(x: ShowType<T>): ShowType<Partial<T>> => x as any

/**
 *  @since 0.0.1
 */
export const showObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<ShowURI, Env> => ({
    _F: ShowURI,
    interface: (props, _name, config) => env =>
      new ShowType(showApplyConfig(config)(getStructShow(projectFieldWithEnv(props, env)('show')), env)),
    partial: (props, _name, config) => env =>
      asPartial(new ShowType(showApplyConfig(config)(getStructShow(projectFieldWithEnv(props, env)('show')), env)))
  })
)
