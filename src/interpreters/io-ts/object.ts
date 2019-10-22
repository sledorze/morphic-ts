import * as t from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraObject1, PropsKind1 } from '../../algebras/object'
import { projectField } from '../../utils'

export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }

export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: <A>(props: PropsKind1<'IOTSType', A>) => {
    const interfaceType: t.InterfaceType<IOTypes<A>> = t.type(projectField(props)('type'))
    return new IOTSType<A>(interfaceType)
  },
  partial: <A>(props: PropsKind1<'IOTSType', A>) => {
    const interfaceType: t.PartialType<IOTypes<A>> = t.partial(projectField(props)('type'))
    return new IOTSType<Partial<A>>(interfaceType)
  }
}
