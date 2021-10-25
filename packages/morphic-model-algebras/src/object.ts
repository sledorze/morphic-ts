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
 *  @since 0.0.1
 */
export interface InterfaceConfig<Props> {}

/**
 *  @since 0.0.1
 */
export interface PartialConfig<Props> {}

/**
 *  @since 0.0.1
 */
export interface BothConfig<Props, PropsPartial> {}

/**
 *  @since 0.0.1
 */
export type PropsKind<F extends URIS, PropsE, PropsA, R> = Readonly<
  {
    [k in keyof PropsA & keyof PropsE]: Kind<F, R, PropsE[k], PropsA[k]>
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
      >,
      InterfaceConfig<
        PropsKind<
          F,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_E']
            }
          >,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_A']
            }
          >,
          Env
        >
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
      >,
      PartialConfig<
        PropsKind<
          F,
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
          >,
          Env
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
    props: Props,
    partial: PartialProps,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        } &
          Partial<
            {
              [k in keyof PartialProps]: PartialProps[k]['_E']
            }
          >
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        } &
          Partial<
            {
              [k in keyof PartialProps]: PartialProps[k]['_A']
            }
          >
      >,
      BothConfig<
        PropsKind<
          F,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_E']
            }
          >,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_A']
            }
          >,
          Env
        >,
        PropsKind<
          F,
          Partial<
            Readonly<
              {
                [k in keyof PartialProps]: PartialProps[k]['_E']
              }
            >
          >,
          Partial<
            Readonly<
              {
                [k in keyof PartialProps]: PartialProps[k]['_A']
              }
            >
          >,
          Env
        >
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      } &
        Partial<
          {
            [k in keyof PartialProps]: PartialProps[k]['_E']
          }
        >
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      } &
        Partial<
          {
            [k in keyof PartialProps]: PartialProps[k]['_A']
          }
        >
    >
  >
}
