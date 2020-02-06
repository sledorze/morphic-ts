import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraObject2, PropsKind2 } from '@morphic/model-algebras/lib/object'
import { projectField } from '@morphic/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) =>
    new IOTSType<PropsE, PropsA>(t.type(projectField(props)('type'), name) as any),
  partial: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.partial(projectField(props)('type'), name) as any)
}

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) =>
    new IOTSType<PropsE, PropsA>(t.strict(projectField(props)('type'), name) as any),
  partial: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.exact(t.partial(projectField(props)('type'), name)) as any)
}
