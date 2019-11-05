import { URIS, Kind, URIS2, Kind2, HKT2 } from '../HKT'

type AnyMProps<F> = Record<string, HKT2<F, any, any>>

export interface ModelAlgebraObject<F> {
  interface: <Props extends AnyMProps<F>>(
    props: Props
  ) => HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  partial: <Props extends AnyMProps<F>>(
    props: Props
  ) => HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
}

export type PropsKind1<F extends URIS, PropsA> = { [k in keyof PropsA]: Kind<F, PropsA[k]> }

export interface ModelAlgebraObject1<F extends URIS> {
  interface: <Props>(props: PropsKind1<F, Props>) => Kind<F, Props>
  partial: <Props>(props: PropsKind1<F, Props>) => Kind<F, Partial<Props>>
}

export type PropsKind2<F extends URIS2, PropsA, PropsE> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, PropsA[k], PropsE[k]>
}

export interface ModelAlgebraObject2<F extends URIS2> {
  interface: <PropsE, PropsA>(props: PropsKind2<F, PropsE, PropsA>) => Kind2<F, PropsE, PropsA>
  partial: <PropsE, PropsA>(props: PropsKind2<F, PropsE, PropsA>) => Kind2<F, Partial<PropsE>, Partial<PropsA>>
}
