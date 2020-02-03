import { ModelAlgebraObject1, PropsKind1 } from '@sledorze/morphic-model-algebras/lib/object'
import { EqType, EqURI } from '..'
import { projectField } from '@sledorze/morphic-common/lib/utils'
import { getStructEq, Eq } from 'fp-ts/lib/Eq'

export const eqObjectInterpreter: ModelAlgebraObject1<EqURI> = {
  _F: EqURI,
  interface: props => new EqType(getStructEq(projectField(props)('eq'))),
  partial: <Props>(props: PropsKind1<EqURI, Props>) =>
    new EqType(getStructEq(projectField(props)('eq')) as Eq<Partial<Props>>) // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
}
