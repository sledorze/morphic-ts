import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraObject2, PropsKind2 } from '../../model-algebras/object'
import { projectField } from '../../common/utils'

export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) => {
    return new IOTSType<PropsE, PropsA>(t.type(projectField(props)('type'), name) as any)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) => {
    return new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.partial(projectField(props)('type'), name) as any)
  }
}

export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) => {
    return new IOTSType<PropsE, PropsA>(t.strict(projectField(props)('type'), name) as any)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<IoTsURI, PropsE, PropsA>, name: string) => {
    return new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.exact(t.partial(projectField(props)('type'), name)) as any)
  }
}
