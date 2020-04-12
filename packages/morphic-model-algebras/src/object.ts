import { URIS, Kind, URIS2, Kind2, HKT2, HKT } from '@morphic-ts/common/lib/HKT'
import { UnionToIntersection } from '@morphic-ts/common/lib/core'
import { ConfigsForType, ConfigsEnvs } from '@morphic-ts/common/lib/config'

type AnyMProps<F> = Record<string, HKT2<F, never, any, any>>
type EnvR<X> = X extends HKT<any, infer R, any> ? R : never
type EnvOfProps<Props extends AnyMProps<any>> = UnionToIntersection<{ [k in keyof Props]: EnvR<Props[k]> }[keyof Props]>

/**
 *  @since 0.0.1
 */
export const ObjectURI = 'ObjectURI' as const
/**
 *  @since 0.0.1
 */
export type ObjectURI = typeof ObjectURI

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject<F> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>>(props: Props, name: string): HKT2<
      F,
      EnvOfProps<Props>,
      { [k in keyof Props]: Props[k]['_E'] },
      { [k in keyof Props]: Props[k]['_A'] }
    >
  }
  interfaceCfg: {
    <Props extends AnyMProps<F>>(props: Props, name: string): <
      C extends ConfigsForType<{ [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    >(
      config: C
    ) => HKT2<
      F,
      EnvOfProps<Props> & ConfigsEnvs<C>,
      { [k in keyof Props]: Props[k]['_E'] },
      { [k in keyof Props]: Props[k]['_A'] }
    >
  }
  partial: {
    <Props extends AnyMProps<F>>(props: Props, name: string): HKT2<
      F,
      EnvOfProps<Props>,
      Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
      Partial<{ [k in keyof Props]: Props[k]['_A'] }>
    >
  }
  partialCfg: {
    <Props extends AnyMProps<F>>(props: Props, name: string): <
      C extends ConfigsForType<
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >
    >(
      config: C
    ) => HKT2<
      F,
      EnvOfProps<Props> & ConfigsEnvs<C>,
      Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
      Partial<{ [k in keyof Props]: Props[k]['_A'] }>
    >
  }
}

/**
 *  @since 0.0.1
 */
export type PropsKind1<F extends URIS, PropsA, R> = { [k in keyof PropsA]: Kind<F, R, PropsA[k]> }

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject1<F extends URIS> {
  _F: F
  interface: <Props, R>(props: PropsKind1<F, Props, R>, name: string) => Kind<F, R, Props>
  interfaceCfg: <Props, R>(
    props: PropsKind1<F, Props, R>,
    name: string
  ) => <C extends ConfigsForType<unknown, Props>>(config: C) => Kind<F, R & ConfigsEnvs<C>, Props>
  partial: <Props, R>(props: PropsKind1<F, Props, R>, name: string) => Kind<F, R, Partial<Props>>
  partialCfg: <Props, R>(
    props: PropsKind1<F, Props, R>,
    name: string
  ) => <C extends ConfigsForType<unknown, Props>>(config: C) => Kind<F, R & ConfigsEnvs<C>, Partial<Props>>
}

/**
 *  @since 0.0.1
 */
export type PropsKind2<F extends URIS2, PropsA, PropsE, R> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, R, PropsA[k], PropsE[k]>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject2<F extends URIS2> {
  _F: F
  interface: <PropsE, PropsA, R>(props: PropsKind2<F, PropsE, PropsA, R>, name: string) => Kind2<F, R, PropsE, PropsA>
  interfaceCfg: <PropsE, PropsA, R>(
    props: PropsKind2<F, PropsE, PropsA, R>,
    name: string
  ) => <C extends ConfigsForType<PropsE, PropsA>>(config: C) => Kind2<F, R & ConfigsEnvs<C>, PropsE, PropsA>
  partial: <PropsE, PropsA, R>(
    props: PropsKind2<F, PropsE, PropsA, R>,
    name: string
  ) => Kind2<F, R, Partial<PropsE>, Partial<PropsA>>
  partialCfg: <PropsE, PropsA, R>(
    props: PropsKind2<F, PropsE, PropsA, R>,
    name: string
  ) => <C extends ConfigsForType<PropsE, PropsA>>(
    config: C
  ) => Kind2<F, R & ConfigsEnvs<C>, Partial<PropsE>, Partial<PropsA>>
}
