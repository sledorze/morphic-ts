import { Ord } from 'fp-ts/lib/Ord'

export const OrdURI = Symbol()
export type OrdURI = typeof OrdURI

export class OrdType<A> {
  constructor(public ord: Ord<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [OrdURI]: OrdType<A>
  }
}
