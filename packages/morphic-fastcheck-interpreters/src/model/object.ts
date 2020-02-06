import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraObject1, PropsKind1 } from '@morphic/model-algebras/lib/object'
import { projectField } from '@morphic/common/lib/utils'
import { RecordConstraints, record } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  _F: FastCheckURI,
  partial: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(
      record<Props, RecordConstraints>(projectField(props)('arb'), {
        withDeletedKeys: true
      })
    ),
  interface: <Props>(props: PropsKind1<FastCheckURI, Props>) =>
    new FastCheckType(record<Props>(projectField(props)('arb')))
}
