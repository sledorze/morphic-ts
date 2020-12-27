import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { OfType } from '@morphic-ts/common/lib/core'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const UnionsURI = 'UnionsURI' as const
/**
 *  @since 0.0.1
 */
export type UnionsURI = typeof UnionsURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [UnionsURI]: ModelAlgebraUnions<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnions<F extends URIS, Env extends AnyEnv> {
  _F: F
  union: {
    <A, B, LA, LB>(types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>], name: string): Kind<F, Env, LA | LB, A | B>
    <A, B, C, LA, LB, LC>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>],
      name: string
    ): Kind<F, Env, LA | LB | LC, A | B | C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>, OfType<F, LD, D, Env>],
      name: string
    ): Kind<F, Env, LA | LB | LC | LD, A | B | C | D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [
        OfType<F, LA, A, Env>,
        OfType<F, LB, B, Env>,
        OfType<F, LC, C, Env>,
        OfType<F, LD, D, Env>,
        OfType<F, LE, E, Env>
      ],
      name: string
    ): Kind<F, Env, LA | LB | LC | LD | LE, A | B | C | D | E>
    <L, A>(types: Array<OfType<F, L, A, Env>>, name: string): Kind<F, Env, Array<L>, Array<A>>
  }
}
