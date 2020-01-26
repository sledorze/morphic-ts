import { Show } from 'fp-ts/lib/Show'
import { genConfig } from '../common/core'

export const ShowURI = Symbol()
export type ShowURI = typeof ShowURI

export class ShowType<A> {
  constructor(public show: Show<A>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [ShowURI]: ShowType<A>
  }
}

export const showConfig = genConfig(ShowURI)
