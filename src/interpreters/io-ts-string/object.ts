import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraObject2, PropsKind2 } from '../../algebras/object'
import { projectFieldApp } from '../../utils'

export const ioTsStringNonStrictObjectInterpreter: ModelAlgebraObject2<URI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<URI, PropsE, PropsA>) =>
    new IOTSStringType<PropsE, PropsA>(() => {
      const typeProps = projectFieldApp(props)('type')
      const interfaceType: t.InterfaceType<typeof typeProps> = t.type(typeProps)
      return interfaceType
    }),
  partial: <PropsE, PropsA>(props: PropsKind2<URI, PropsE, PropsA>) =>
    new IOTSStringType<Partial<PropsE>, Partial<PropsA>>(() => {
      const typeProps = projectFieldApp(props)('type')
      const interfaceType: t.PartialType<typeof typeProps> = t.partial(typeProps)
      return interfaceType
    })
}
