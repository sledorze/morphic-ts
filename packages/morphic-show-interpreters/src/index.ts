import { Show } from 'fp-ts/lib/Show'
import { genConfig } from '@sledorze/morphic-common/lib/core'

export const ShowURI = Symbol()
export type ShowURI = typeof ShowURI

export class ShowType<A> {
  _A!: A
  _URI!: ShowURI
  constructor(public show: Show<A>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind<A> {
    [ShowURI]: ShowType<A>
  }
}

export const showConfig = genConfig(ShowURI)
