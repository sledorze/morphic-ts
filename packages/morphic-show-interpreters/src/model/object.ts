import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { ShowType, ShowURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'

const asPartial = <T>(x: ShowType<T>): ShowType<Partial<T>> => x as any

/**
 *  @since 0.0.1
 */
export const showObjectInterpreter: ModelAlgebraObject1<ShowURI> = {
  _F: ShowURI,
  // TODO: add customize
  interface: props => _config => env => new ShowType(getStructShow(projectFieldWithEnv(props, env)('show'))),
  // TODO: add customize
  partial: props => _config => env => asPartial(new ShowType(getStructShow(projectFieldWithEnv(props, env)('show'))))
}
