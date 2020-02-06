import { Eq } from 'fp-ts/lib/Eq'
import { genConfig } from '@morphic/common/lib/core'

/**
 *  @since 0.0.1
 */
export const EqURI = Symbol()
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

declare module '@morphic/common/lib/HKT' {
  interface URItoKind<A> {
    [EqURI]: EqType<A>
  }
}

/**
 *  @since 0.0.1
 */
export const eqConfig = genConfig(EqURI)
