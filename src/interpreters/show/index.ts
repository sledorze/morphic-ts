import { Show } from 'fp-ts/lib/Show'

export const URI = 'ShowType'
export type URI = typeof URI

export class ShowType<A> {
  constructor(public show: Show<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [URI]: ShowType<A>
  }
}
