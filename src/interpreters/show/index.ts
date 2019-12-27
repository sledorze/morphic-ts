import { Show } from 'fp-ts/lib/Show'

export const ShowURI = Symbol()
export type ShowURI = typeof ShowURI

export class ShowType<A> {
  constructor(public show: Show<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [ShowURI]: ShowType<A>
  }
}
