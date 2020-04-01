import { ModelAlgebraObject1, PropsKind1 } from '@morphic-ts/model-algebras/lib/object'
import { EqType, EqURI } from '../hkt'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { getStructEq, Eq } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export const eqObjectInterpreter: ModelAlgebraObject1<EqURI> = {
  _F: EqURI,
  interface: props => env => new EqType(getStructEq(projectFieldWithEnv(props, env)('eq'))),
  partial: <Props, R, RC>(props: PropsKind1<EqURI, Props, R>) => (env: R & RC) =>
    new EqType(getStructEq(projectFieldWithEnv(props, env)('eq')) as Eq<Partial<Props>>) // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
}
