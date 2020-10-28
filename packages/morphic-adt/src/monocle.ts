import type { Option } from 'fp-ts/Option'
import type { Predicate, Refinement } from 'fp-ts/function'
import type { At, LensFromPath } from 'monocle-ts'
import { Lens, Optional, Prism, Index } from 'monocle-ts'

interface LensFromProp<S> {
  <P extends keyof S>(prop: P): Lens<S, S[P]>
}

interface LensFromProps<S> {
  <P extends keyof S>(props: Array<P>): Lens<
    S,
    {
      [K in P]: S[K]
    }
  >
}
declare type OptionPropertyNames<S> = {
  [K in keyof S]-?: S[K] extends Option<any> ? K : never
}[keyof S]
declare type OptionPropertyType<S, K extends OptionPropertyNames<S>> = S[K] extends Option<infer A> ? A : never
interface OptionalFromOptionProp<S> {
  <P extends OptionPropertyNames<S>>(prop: P): Optional<S, OptionPropertyType<S, P>>
} //
interface OptionalFromNullableProp<S> {
  <K extends keyof S>(k: K): Optional<S, NonNullable<S[K]>>
}
interface IndexFromAt<T> {
  <J, B>(at: At<T, J, Option<B>>): Index<T, J, B>
}

interface PrismFromPredicate<S> {
  <A extends S>(refinement: Refinement<S, A>): Prism<S, A>
  (predicate: Predicate<S>): Prism<S, S>
}

/**
 *  @since 0.0.1
 */
export interface MonocleFor<S> {
  lensFromProp: LensFromProp<S>
  lensFromProps: LensFromProps<S>
  lensFromPath: LensFromPath<S>
  indexFromAt: IndexFromAt<S>
  optionalFromOptionProp: OptionalFromOptionProp<S>
  optionalFromNullableProp: OptionalFromNullableProp<S>
  prism: Prism<Option<S>, S>
  prismFromPredicate: PrismFromPredicate<S>
}

const makeMonocleFor = <S>(): MonocleFor<S> => ({
  lensFromProp: Lens.fromProp(),
  lensFromProps: Lens.fromProps(),
  lensFromPath: Lens.fromPath(),
  indexFromAt: Index.fromAt,
  optionalFromOptionProp: Optional.fromOptionProp(), // caused by OptionPropertyNames
  optionalFromNullableProp: Optional.fromNullableProp(),
  prism: Prism.some(),
  prismFromPredicate: Prism.fromPredicate
})

const staticMonocle = makeMonocleFor<any>()

/**
 *  @since 0.0.1
 */
export const MonocleFor = <A>(): MonocleFor<A> => staticMonocle
