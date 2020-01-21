import * as t from 'io-ts'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraObject2, PropsKind2 } from '../../model-algebras/object'
import { projectField } from '../../common/utils'

export const ioTs2NonStrictObjectInterpreter: ModelAlgebraObject2<IoTs2URI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<IoTs2URI, PropsE, PropsA>, name: string) => {
    return new IOTS2Type<PropsE, PropsA>(t.type(projectField(props)('type'), name) as any)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<IoTs2URI, PropsE, PropsA>, name: string) => {
    return new IOTS2Type<Partial<PropsE>, Partial<PropsA>>(t.partial(projectField(props)('type'), name) as any)
  }
}

export const ioTs2StrictObjectInterpreter: ModelAlgebraObject2<IoTs2URI> = {
  interface: <PropsE, PropsA>(props: PropsKind2<IoTs2URI, PropsE, PropsA>, name: string) => {
    return new IOTS2Type<PropsE, PropsA>(t.strict(projectField(props)('type'), name) as any)
  },
  partial: <PropsE, PropsA>(props: PropsKind2<IoTs2URI, PropsE, PropsA>, name: string) => {
    return new IOTS2Type<Partial<PropsE>, Partial<PropsA>>(t.exact(t.partial(projectField(props)('type'), name)) as any)
  }
}
