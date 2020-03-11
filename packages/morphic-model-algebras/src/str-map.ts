import { Kind, URIS, Kind2, URIS2, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ByInterp, isOptionalConfig } from '@morphic-ts/common/lib/core'
import { StrMapConfig } from '@morphic-ts/algebras/lib/hkt'

/**
 *  @since 0.0.1
 */
export const StrMapURI = 'StrMapURI' as const
/**
 *  @since 0.0.1
 */
export type StrMapURI = typeof StrMapURI

declare module '@morphic-ts/algebras/lib/hkt' {
  interface Algebra<F> {
    [StrMapURI]: ModelAlgebraStrMap<F>
  }
  interface Algebra1<F extends URIS> {
    [StrMapURI]: ModelAlgebraStrMap1<F>
  }
  interface Algebra2<F extends URIS2> {
    [StrMapURI]: ModelAlgebraStrMap2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap<F> {
  _F: F
  strMap: {
    <L, A>(codomain: HKT2<F, L, A>): isOptionalConfig<
      StrMapConfig<L, A>,
      HKT2<F, Array<[string, L]>, Record<string, A>>
    >
    <L, A>(codomain: HKT2<F, L, A>, config?: ByInterp<StrMapConfig<L, A>, URIS | URIS2>): HKT2<
      F,
      Array<[string, L]>,
      Record<string, A>
    >
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap1<F extends URIS> {
  _F: F
  strMap: <A>(codomain: Kind<F, A>, config?: ByInterp<StrMapConfig<unknown, A>, F>) => Kind<F, Record<string, A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap2<F extends URIS2> {
  _F: F
  strMap: <L, A>(
    codomain: Kind2<F, L, A>,
    config?: ByInterp<StrMapConfig<L, A>, F>
  ) => Kind2<F, Record<string, L>, Record<string, A>>
}
