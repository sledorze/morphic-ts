import * as t from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraObject1, PropsKind1 } from '../../algebras/object'
import { projectFieldApp } from '../../utils'

export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }

export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: <A>(props: PropsKind1<'IOTSType', A>) => {
    return new IOTSType<A>(() => {
      const interfaceType: t.InterfaceType<IOTypes<A>> = t.type(projectFieldApp(props)('type'))
      return interfaceType
    })
  },
  partial: <A>(props: PropsKind1<'IOTSType', A>) => {
    return new IOTSType<Partial<A>>(() => {
      const interfaceType: t.PartialType<IOTypes<A>> = t.partial(projectFieldApp(props)('type'))
      return interfaceType
    })
  }
}
