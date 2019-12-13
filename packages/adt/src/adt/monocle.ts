import { Predicate, Refinement } from 'fp-ts/lib/function'
import * as m from 'monocle-ts'
import { Option } from 'fp-ts/lib/Option'

/**
 * @since 0.0.1
 */
type LenseFromProp<S> = <P extends keyof S>(prop: P) => m.Lens<S, S[P]>

/**
 * @since 0.0.1
 */
type LenseFromProps<S> = <P extends keyof S>(
  props: Array<P>
) => m.Lens<
  S,
  {
    [K in P]: S[K]
  }
>

/**
 * @since 0.0.1
 */
declare type OptionPropertyNames<S> = {
  [K in keyof S]-?: S[K] extends Option<any> ? K : never
}[keyof S]

/**
 * @since 0.0.1
 */
declare type OptionPropertyType<S, K extends OptionPropertyNames<S>> = S[K] extends Option<infer A> ? A : never

/**
 * @since 0.0.1
 */
type OptionalFromOptionProp<S> = <P extends OptionPropertyNames<S>>(prop: P) => m.Optional<S, OptionPropertyType<S, P>> //

/**
 * @since 0.0.1
 */
type OptionalFromNullableProp<S> = <K extends keyof S>(k: K) => m.Optional<S, NonNullable<S[K]>>

/**
 * @since 0.0.1
 */
type IndexFromAt<T> = <J, B>(at: m.At<T, J, Option<B>>) => m.Index<T, J, B>

/**
 * @since 0.0.1
 */
interface PrismFromPredicate<S> {
  <A extends S>(refinement: Refinement<S, A>): m.Prism<S, A>
  (predicate: Predicate<S>): m.Prism<S, S>
}

/**
 * @since 0.0.1
 */
export interface MonocleFor<S> {
  lenseFromProp: LenseFromProp<S>
  lenseFromProps: LenseFromProps<S>
  lenseFromPath: m.LensFromPath<S>
  indexFromAt: IndexFromAt<S>
  optionalFromOptionProp: OptionalFromOptionProp<S>
  optionalFromNullableProp: OptionalFromNullableProp<S>
  prism: m.Prism<Option<S>, S>
  prismFromPredicate: PrismFromPredicate<S>
}

/**
 * @since 0.0.1
 */
const makeMonocleFor = <S>(): MonocleFor<S> => ({
  lenseFromProp: m.Lens.fromProp(),
  lenseFromProps: m.Lens.fromProps(),
  lenseFromPath: m.Lens.fromPath(),
  indexFromAt: m.Index.fromAt,
  optionalFromOptionProp: m.Optional.fromOptionProp() as any, // caused by OptionPropertyNames
  optionalFromNullableProp: m.Optional.fromNullableProp(),
  prism: m.Prism.some(),
  prismFromPredicate: m.Prism.fromPredicate
})

/**
 * @since 0.0.1
 */
const staticMonocle = makeMonocleFor<any>()

/**
 * @since 0.0.1
 */
export const MonocleFor = <A>(): MonocleFor<A> => staticMonocle
