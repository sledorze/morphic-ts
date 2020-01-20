import * as t from 'io-ts'
import { IOTSStringType, IoTsStringURI } from '..'
import { ModelAlgebraObject2, PropsKind2 } from '../../../model-algebras/object'
import { projectField } from '../../../common/utils'

export const ioTsStringNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsStringURI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<IoTsStringURI, PropsE, PropsA>, name: string) => {
    const typeProps = projectField(props)('type')
    const interfaceType: t.InterfaceType<typeof typeProps> = t.type(typeProps, name)
    return new IOTSStringType<PropsE, PropsA>(interfaceType)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<IoTsStringURI, PropsE, PropsA>, name: string) => {
    const typeProps = projectField(props)('type')
    const interfaceType: t.PartialType<typeof typeProps> = t.partial(typeProps, name)
    return new IOTSStringType<Partial<PropsE>, Partial<PropsA>>(interfaceType)
  }
}
