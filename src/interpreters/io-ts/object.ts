import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '.'
import { ModelAlgebraObject1, PropsKind1 } from '../../algebras/object'
import { projectField } from '../../utils'
import { ObjectInterfaceConfig, ObjectPartialConfig } from '../../algebras/hkt'

declare module '../../algebras/hkt' {}

export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }

export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject1<IoTsURI> = {
  interface: <A>(props: PropsKind1<IoTsURI, A>, name: string, _config?: Partial<ObjectInterfaceConfig>) => {
    const interfaceType: t.InterfaceType<IOTypes<A>> = t.type(projectField(props)('type'), name)
    return new IOTSType<A>(interfaceType)
  },
  partial: <A>(props: PropsKind1<IoTsURI, A>, name: string, _config?: Partial<ObjectPartialConfig>) => {
    const interfaceType: t.PartialType<IOTypes<A>> = t.partial(projectField(props)('type'), name)
    return new IOTSType<Partial<A>>(interfaceType)
  }
}
