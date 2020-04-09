import { URIS, Kind, URIS2, Kind2, HKT2, HKT } from '@morphic-ts/common/lib/HKT'
import { isOptionalConfig, ByInterp, UnionToIntersection } from '@morphic-ts/common/lib/core'
import { ObjectInterfaceConfig, ObjectPartialConfig } from '@morphic-ts/algebras/lib/hkt'

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

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [ObjectURI]: ModelAlgebraObject<F>
  }
  export interface Algebra1<F extends URIS> {
    [ObjectURI]: ModelAlgebraObject1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [ObjectURI]: ModelAlgebraObject2<F>
  }
  /**
   *  @since 0.0.1
   */
  export interface ObjectInterfaceConfig<RC, E, A> {}
  /**
   *  @since 0.0.1
   */
  export interface ObjectPartialConfig<RC, E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject<F> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>, RC>(props: Props, name: string): isOptionalConfig<
      ObjectInterfaceConfig<RC, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>,
      HKT2<F, EnvOfProps<Props>, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    >
  }
  interfaceCfg: {
    <Props extends AnyMProps<F>>(props: Props, name: string): <RC>(
      config: ByInterp<
        ObjectInterfaceConfig<RC, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>,
        URIS | URIS2
      >
    ) => HKT2<F, EnvOfProps<Props>, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  }
  partial: {
    <Props extends AnyMProps<F>, RC>(props: Props, name: string): isOptionalConfig<
      ObjectPartialConfig<
        RC,
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >,
      HKT2<
        F,
        EnvOfProps<Props>,
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >
    >
  }
  partialCfg: {
    <Props extends AnyMProps<F>>(props: Props, name: string): <RC>(
      config: ByInterp<
        ObjectPartialConfig<
          RC,
          Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
          Partial<{ [k in keyof Props]: Props[k]['_A'] }>
        >,
        URIS | URIS2
      >
    ) => HKT2<
      F,
      EnvOfProps<Props>,
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
  ) => <RC>(config: ByInterp<ObjectInterfaceConfig<RC, Props, Props>, F>) => Kind<F, R & RC, Props>
  partial: <Props, R>(props: PropsKind1<F, Props, R>, name: string) => Kind<F, R, Partial<Props>>
  partialCfg: <Props, R>(
    props: PropsKind1<F, Props, R>,
    name: string
  ) => <RC>(config: ByInterp<ObjectPartialConfig<RC, Props, Props>, F>) => Kind<F, R & RC, Partial<Props>>
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
  ) => <RC>(config: ByInterp<ObjectInterfaceConfig<RC, PropsE, PropsA>, F>) => Kind2<F, R & RC, PropsE, PropsA>
  partial: <PropsE, PropsA, R>(
    props: PropsKind2<F, PropsE, PropsA, R>,
    name: string
  ) => Kind2<F, R, Partial<PropsE>, Partial<PropsA>>
  partialCfg: <PropsE, PropsA, R>(
    props: PropsKind2<F, PropsE, PropsA, R>,
    name: string
  ) => <RC>(
    config: ByInterp<ObjectPartialConfig<RC, PropsE, PropsA>, F>
  ) => Kind2<F, R & RC, Partial<PropsE>, Partial<PropsA>>
}
