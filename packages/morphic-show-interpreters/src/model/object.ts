import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { ShowType, ShowURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructShow } from 'fp-ts/lib/Show'

/**
 *  @since 0.0.1
 */
export const showObjectInterpreter: ModelAlgebraObject1<ShowURI> = {
  _F: ShowURI,
  interface: props => env => new ShowType(getStructShow(projectFieldWithEnv(props, env)('show'))),
  partial: props => env => new ShowType(getStructShow(projectFieldWithEnv(props, env)('show'))) as any // FIXME: relies on Show<A> whereas we need Show<Partial<A>>
}
