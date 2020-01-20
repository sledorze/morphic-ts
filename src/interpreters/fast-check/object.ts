import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '.'
import { ModelAlgebraObject1, PropsKind1 } from '../../algebras/object'
import { projectField } from '../../common/utils'

export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  partial: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(
      fc.record<Props, fc.RecordConstraints>(projectField(props)('arb'), {
        withDeletedKeys: true
      })
    ),
  interface: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(fc.record<Props>(projectField(props)('arb')))
}
