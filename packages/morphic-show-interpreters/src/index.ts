import { Show } from 'fp-ts/lib/Show'
import { genConfig } from '@morphic/common/lib/core'

/**
 *  @since 0.0.1
 */
export const ShowURI = Symbol()
/**
 *  @since 0.0.1
 */
export type ShowURI = typeof ShowURI

/**
 *  @since 0.0.1
 */
export class ShowType<A> {
  _A!: A
  _URI!: ShowURI
  constructor(public show: Show<A>) {}
}

declare module '@morphic/common/lib/HKT' {
  interface URItoKind<A> {
    [ShowURI]: ShowType<A>
  }
}

/**
 *  @since 0.0.1
 */
export const showConfig = genConfig(ShowURI)
