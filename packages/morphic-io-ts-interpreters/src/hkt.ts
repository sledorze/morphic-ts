import type { Either } from 'fp-ts/Either'
import { map } from 'fp-ts/Either'
import type { Errors, Type } from 'io-ts'

import type { Validated } from './create'

/**
 *  @since 0.0.1
 */
export const IoTsURI = 'IoTsURI' as const

/**
 *  @since 0.0.1
 */
export type IoTsURI = typeof IoTsURI

declare module '@morphic-ts/common/lib/config' {
  export interface ConfigType<E, A> {
    [IoTsURI]: Type<A, E>
  }
}

/**
 *  @since 0.0.1
 */
export class IOTSType<O, A> {
  _A!: A
  _E!: O
  _URI!: IoTsURI
  create: (a: A) => Either<Errors, Validated<A>>
  constructor(public type: Type<A, O>) {
    this.create = a => map((x: A) => x as Validated<A>)(this.type.decode(this.type.encode(a)))
  }
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, E, A> {
    [IoTsURI]: (env: R) => IOTSType<E, A>
  }
}
