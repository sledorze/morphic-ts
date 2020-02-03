import * as t from 'io-ts'
import { genConfig } from '@sledorze/morphic-common/lib/core'

export const IoTsURI = Symbol()
export type IoTsURI = typeof IoTsURI

export class IOTSType<O, A> {
  _A!: A
  _E!: O
  _URI!: IoTsURI
  constructor(public type: t.Type<A, O>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind2<E, A> {
    [IoTsURI]: IOTSType<E, A>
  }
}

export const iotsConfig = genConfig(IoTsURI)
