import { ModelAlgebraObject1, PropsKind1 } from '../../algebras/object'
import { EqType, URI } from '.'
import { projectField } from '../../utils'
import { getStructEq, Eq } from 'fp-ts/lib/Eq'

export const eqObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: props => new EqType(getStructEq(projectField(props)('eq'))),
  partial: <Props>(props: PropsKind1<'EqType', Props>) =>
    new EqType(getStructEq(projectField(props)('eq')) as Eq<Partial<Props>>) // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
}
