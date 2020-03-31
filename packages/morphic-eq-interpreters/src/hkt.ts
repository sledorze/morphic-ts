import { Eq } from 'fp-ts/lib/Eq'

/**
 *  @since 0.0.1
 */
export const EqURI = 'EqURI' as const
/**
 *  @since 0.0.1
 */
export type EqURI = typeof EqURI

/**
 *  @since 0.0.1
 */
export class EqType<A> {
  _A!: A
  _URI!: EqURI
  constructor(public eq: Eq<A>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [EqURI]: (env: R) => EqType<A>
  }
}
