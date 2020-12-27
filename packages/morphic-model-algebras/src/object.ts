import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { HKT, Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const ObjectURI = 'ObjectURI' as const
/**
 *  @since 0.0.1
 */
export type ObjectURI = typeof ObjectURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [ObjectURI]: ModelAlgebraObject<F, Env>
  }
}

/**

/**
 *  @since 0.0.1
 */
export type PropsKind<F extends URIS, PropsA, PropsE, R> = Readonly<
  {
    [k in keyof PropsA & keyof PropsE]: Kind<F, R, PropsA[k], PropsE[k]>
  }
>

/**
 *  @since 0.0.1
 */
export type PropsE<
  Props extends {
    [k in keyof Props]: HKT<any, any, any>
  }
> = {
  [k in keyof Props]: Props[k]['_E']
}

/**
 *  @since 0.0.1
 */
export type PropsA<
  Props extends {
    [k in keyof Props]: HKT<any, any, any>
  }
> = {
  [k in keyof Props]: Props[k]['_A']
}

/**
 *  @since 0.0.1
 */
export type AnyProps<Props, Env extends AnyEnv> = { [k in keyof Props]: HKT<Env, any, any> }

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraObject<F extends URIS, Env extends AnyEnv> {
  _F: F
  interface: <Props extends AnyProps<Props, Env>>(
    props: Props,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        }
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        }
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      }
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      }
    >
  >
  partial: <Props extends AnyProps<Props, Env>>(
    props: Props,
    name: string,
    config?: ConfigsForType<
      Env,
      Partial<
        Readonly<
          {
            [k in keyof Props]: Props[k]['_E']
          }
        >
      >,
      Partial<
        Readonly<
          {
            [k in keyof Props]: Props[k]['_A']
          }
        >
      >
    >
  ) => Kind<
    F,
    Env,
    Partial<
      {
        [k in keyof Props]: Props[k]['_E']
      }
    >,
    Partial<
      {
        [k in keyof Props]: Props[k]['_A']
      }
    >
  >
  both: <Props extends AnyProps<Props, Env>, PartialProps extends AnyProps<PartialProps, Env>>(
    props: PropsKind<
      F,
      {
        [k in keyof Props]: Props[k]['_E']
      },
      {
        [k in keyof Props]: Props[k]['_A']
      },
      Env
    >,
    partial: PropsKind<F, PropsE<PartialProps>, PropsA<PartialProps>, Env>,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        } &
          Partial<PropsE<PartialProps>>
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        } &
          Partial<PropsA<PartialProps>>
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      } &
        Partial<PropsE<PartialProps>>
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      } &
        Partial<PropsA<PartialProps>>
    >
  >
}
