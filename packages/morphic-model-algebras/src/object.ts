import type { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib/HKT'
import type { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

type AnyMProps<F> = Record<string, HKT2<F, never, any, any>>

/**
 *  @since 0.0.1
 */
export const ObjectURI = 'ObjectURI' as const
/**
 *  @since 0.0.1
 */
export type ObjectURI = typeof ObjectURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F, Env> {
    [ObjectURI]: ModelAlgebraObject<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [ObjectURI]: ModelAlgebraObject1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [ObjectURI]: ModelAlgebraObject2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject<F, Env> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    ): HKT2<F, Env, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  }
  partial: {
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config?: ConfigsForType<
        Env,
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >
    ): HKT2<F, Env, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
  }
  both: {
    <Props extends AnyMProps<F>, PProps extends AnyMProps<F>>(
      props: Props,
      partial: PProps,
      name: string,
      config?: ConfigsForType<
        Env,
        { [k in keyof Props]: Props[k]['_E'] } & Partial<{ [k in keyof PProps]: PProps[k]['_E'] }>,
        { [k in keyof Props]: Props[k]['_A'] } & Partial<{ [k in keyof PProps]: PProps[k]['_A'] }>
      >
    ): HKT2<
      F,
      Env,
      { [k in keyof Props]: Props[k]['_E'] } & Partial<{ [k in keyof PProps]: PProps[k]['_E'] }>,
      { [k in keyof Props]: Props[k]['_A'] } & Partial<{ [k in keyof PProps]: PProps[k]['_A'] }>
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
export interface ModelAlgebraObject1<F extends URIS, Env extends AnyEnv> {
  _F: F
  interface: <Props>(
    props: PropsKind1<F, Props, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Props>
  ) => Kind<F, Env, Props>
  partial: <Props>(
    props: PropsKind1<F, Props, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Partial<Props>>
  ) => Kind<F, Env, Partial<Props>>
  both: <Props, PProps>(
    props: PropsKind1<F, Props, Env>,
    partial: PropsKind1<F, PProps, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Props & Partial<PProps>>
  ) => Kind<F, Env, Props & Partial<PProps>>
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
export interface ModelAlgebraObject2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  interface: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, PropsE, PropsA>
  ) => Kind2<F, Env, PropsE, PropsA>
  partial: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, Partial<PropsE>, Partial<PropsA>>
  ) => Kind2<F, Env, Partial<PropsE>, Partial<PropsA>>
  both: <PropsE, PPropsE, PropsA, PPropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    partial: PropsKind2<F, PPropsE, PPropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
  ) => Kind2<F, Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
}
