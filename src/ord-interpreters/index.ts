import { Ord } from 'fp-ts/lib/Ord'
import { genConfig } from '../common/core'

export const OrdURI = Symbol()
export type OrdURI = typeof OrdURI

export class OrdType<A> {
  constructor(public ord: Ord<A>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [OrdURI]: OrdType<A>
  }
}

export const ordConfig = genConfig(OrdURI)
