import type { Show } from 'fp-ts/Show'

/**
 *  @since 0.0.1
 */
export const ShowURI = 'ShowURI' as const
/**
 *  @since 0.0.1
 */
export type ShowURI = typeof ShowURI

declare module '@morphic-ts/common/lib/config' {
  export interface ConfigType<E, A> {
    [ShowURI]: Show<A>
  }
}

/**
 *  @since 0.0.1
 */
export class ShowType<A> {
  _A!: A
  _URI!: ShowURI
  constructor(public show: Show<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, E, A> {
    [ShowURI]: (env: R) => ShowType<A>
  }
}
