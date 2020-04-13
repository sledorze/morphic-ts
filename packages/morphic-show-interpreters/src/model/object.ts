import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { ShowType, ShowURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'
import { showApplyConfig } from '../config'

const asPartial = <T>(x: ShowType<T>): ShowType<Partial<T>> => x as any

/**
 *  @since 0.0.1
 */
export const showObjectInterpreter: ModelAlgebraObject1<ShowURI> = {
  _F: ShowURI,
  interface: props => env => new ShowType(getStructShow(projectFieldWithEnv(props, env)('show'))),
  interfaceCfg: props => config => env =>
    new ShowType(showApplyConfig(config)(getStructShow(projectFieldWithEnv(props, env)('show')), env)),
  partial: props => env => asPartial(new ShowType(getStructShow(projectFieldWithEnv(props, env)('show')))),
  partialCfg: props => config => env =>
    asPartial(new ShowType(showApplyConfig(config)(getStructShow(projectFieldWithEnv(props, env)('show')), env)))
}
