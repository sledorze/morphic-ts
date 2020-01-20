import { Eq } from 'fp-ts/lib/Eq'

export const EqURI = Symbol()
export type EqURI = typeof EqURI

export class EqType<A> {
  constructor(public eq: Eq<A>) {}
}

declare module '../../common/HKT' {
  interface URItoKind<A> {
    [EqURI]: EqType<A>
  }
}
