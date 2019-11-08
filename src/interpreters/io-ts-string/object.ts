import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraObject2, PropsKind2 } from '../../algebras/object'
import { projectField } from '../../utils'

export const ioTsStringNonStrictObjectInterpreter: ModelAlgebraObject2<URI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<URI, PropsE, PropsA>) => {
    const typeProps = projectField(props)('type')
    const interfaceType: t.InterfaceType<typeof typeProps> = t.type(typeProps)
    return new IOTSStringType<PropsE, PropsA>(interfaceType)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<URI, PropsE, PropsA>) => {
    const typeProps = projectField(props)('type')
    const interfaceType: t.PartialType<typeof typeProps> = t.partial(typeProps)
    return new IOTSStringType<Partial<PropsE>, Partial<PropsA>>(interfaceType)
  }
}
