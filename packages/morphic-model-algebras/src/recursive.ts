import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { HKT2, Kind, Kind2, URIS, URIS2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const RecursiveURI = 'RecursiveURI' as const
/**
 *  @since 0.0.1
 */
export type RecursiveURI = typeof RecursiveURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F, Env> {
    [RecursiveURI]: ModelAlgebraRecursive<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [RecursiveURI]: ModelAlgebraRecursive1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [RecursiveURI]: ModelAlgebraRecursive2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive<F, Env> {
  _F: F
  recursive: <L, A>(a: (x: HKT2<F, Env, L, A>) => HKT2<F, Env, L, A>, name: string) => HKT2<F, Env, L, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive1<F extends URIS, Env extends AnyEnv> {
  _F: F
  recursive: <A>(a: (x: Kind<F, Env, A>) => Kind<F, Env, A>, name: string) => Kind<F, Env, A>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  recursive: <L, A>(a: (x: Kind2<F, Env, L, A>) => Kind2<F, Env, L, A>, name: string) => Kind2<F, Env, L, A>
}
