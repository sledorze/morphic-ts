import { Branded, Errors, Type } from 'io-ts'
import { Either, either } from 'fp-ts/lib/Either'

export interface Validatedbrand {
  readonly validated: unique symbol
}
export type Validated<A> = Branded<A, Validatedbrand>

export interface Create<A> {
  (a: A): Either<Errors, Validated<A>>
}

export const makeCreate: <A, O extends I, I>(type: Type<A, O, I>) => Create<A> = <A, O extends I, I>(
  type: Type<A, O, I>
) => (a: A): Either<Errors, Validated<A>> => either.map(type.decode(type.encode(a)), x => x as Validated<A>)
