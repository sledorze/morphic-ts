import type { Branded, Errors } from 'io-ts'
import type { Either } from 'fp-ts/Either'

/**
 *  @since 0.0.1
 */
export interface Validatedbrand {
  readonly validated: unique symbol
}

/**
 *  @since 0.0.1
 */
export type Validated<A> = Branded<A, Validatedbrand>

/**
 *  @since 0.0.1
 */
export interface Create<A> {
  (a: A): Either<Errors, Validated<A>>
}
