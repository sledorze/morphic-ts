import { Eq } from 'fp-ts/lib/Eq'
import { genConfig } from '../common/core'

export const EqURI = Symbol()
export type EqURI = typeof EqURI

export class EqType<A> {
  constructor(public eq: Eq<A>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [EqURI]: EqType<A>
  }
}

export const eqConfig = genConfig(EqURI)
