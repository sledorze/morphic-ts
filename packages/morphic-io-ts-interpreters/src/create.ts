import type { Branded, Errors } from 'io-ts'
import type { Either } from 'fp-ts/lib/Either'

export interface Validatedbrand {
  readonly validated: unique symbol
}
export type Validated<A> = Branded<A, Validatedbrand>

export interface Create<A> {
  (a: A): Either<Errors, Validated<A>>
}
