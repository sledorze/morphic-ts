import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraObject1, PropsKind1 } from '../../model-algebras/object'
import { projectField } from '../../common/utils'
import { RecordConstraints, record } from 'fast-check'

export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  partial: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(
      record<Props, RecordConstraints>(projectField(props)('arb'), {
        withDeletedKeys: true
      })
    ),
  interface: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(record<Props>(projectField(props)('arb')))
}
