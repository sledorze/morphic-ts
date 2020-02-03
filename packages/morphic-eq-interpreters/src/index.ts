import { Eq } from 'fp-ts/lib/Eq'
import { genConfig } from '@sledorze/morphic-common/lib/core'

export const EqURI = Symbol()
export type EqURI = typeof EqURI

export class EqType<A> {
  _A!: A
  _URI!: EqURI
  constructor(public eq: Eq<A>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind<A> {
    [EqURI]: EqType<A>
  }
}

export const eqConfig = genConfig(EqURI)
