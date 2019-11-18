import { URIS, Kind, URIS2, Kind2, HKT2 } from '../HKT'
import { isOptionalConfig, ByInterp } from '../core'
import { ObjectInterfaceConfig, ObjectPartialConfig } from './hkt'

type AnyMProps<F> = Record<string, HKT2<F, any, any>>

export const URI = 'Object'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    Object: ModelAlgebraObject<F>
  }
  interface Algebra1<F extends URIS> {
    Object: ModelAlgebraObject1<F>
  }
  interface Algebra2<F extends URIS2> {
    Object: ModelAlgebraObject2<F>
  }
  export interface ObjectInterfaceConfig {}
  export interface ObjectPartialConfig {}
}

export interface ModelAlgebraObject<F> {
  interface<Props extends AnyMProps<F>>(
    props: Props,
    name: string
  ): isOptionalConfig<
    ObjectInterfaceConfig,
    HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>,
    'Requiring some config via interface(..., { <Interp>: ...  })'
  >
  interface<Props extends AnyMProps<F>>(
    props: Props,
    name: string,
    config: ByInterp<ObjectInterfaceConfig, URIS | URIS2>
  ): HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  partial<Props extends AnyMProps<F>>(
    props: Props,
    name: string
  ): isOptionalConfig<
    ObjectPartialConfig,
    HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>,
    'Requiring some config via partial(..., { <Interp>: ...  })'
  >
  partial<Props extends AnyMProps<F>>(
    props: Props,
    name: string,
    config: ByInterp<ObjectPartialConfig, URIS | URIS2>
  ): HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
}

export type PropsKind1<F extends URIS, PropsA> = { [k in keyof PropsA]: Kind<F, PropsA[k]> }

export interface ModelAlgebraObject1<F extends URIS> {
  interface: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig, F>
  ) => Kind<F, Props>
  partial: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config: ByInterp<ObjectPartialConfig, F>
  ) => Kind<F, Partial<Props>>
}

export type PropsKind2<F extends URIS2, PropsA, PropsE> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, PropsA[k], PropsE[k]>
}

export interface ModelAlgebraObject2<F extends URIS2> {
  interface: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig, F>
  ) => Kind2<F, PropsE, PropsA>
  partial: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectPartialConfig, F>
  ) => Kind2<F, Partial<PropsE>, Partial<PropsA>>
}
