import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { EqType, EqURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructEq } from 'fp-ts/lib/Eq'

const asPartial = <T>(x: EqType<T>): EqType<Partial<T>> => x as any
/**
 *  @since 0.0.1
 */
export const eqObjectInterpreter: ModelAlgebraObject1<EqURI> = {
  _F: EqURI,
  interface: props => _config => env => new EqType(getStructEq(projectFieldWithEnv(props, env)('eq'))), // TODO: add customize
  // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
  partial: props => _config => env => asPartial(new EqType(getStructEq(projectFieldWithEnv(props, env)('eq')))) // TODO: add customize
}
