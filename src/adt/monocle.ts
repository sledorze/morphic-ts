import { Predicate, Refinement } from 'fp-ts/lib/function'
import * as m from 'monocle-ts'
import { Option } from 'fp-ts/lib/Option'

type LenseFromProp<S> = <P extends keyof S>(prop: P) => m.Lens<S, S[P]>

type LenseFromProps<S> = <P extends keyof S>(
  props: Array<P>
) => m.Lens<
  S,
  {
    [K in P]: S[K]
  }
>
declare type OptionPropertyNames<S> = {
  [K in keyof S]-?: S[K] extends Option<any> ? K : never
}[keyof S]
declare type OptionPropertyType<S, K extends OptionPropertyNames<S>> = S[K] extends Option<infer A> ? A : never
type OptionalFromOptionProp<S> = <P extends OptionPropertyNames<S>>(prop: P) => m.Optional<S, OptionPropertyType<S, P>> //
type OptionalFromNullableProp<S> = <K extends keyof S>(k: K) => m.Optional<S, NonNullable<S[K]>>
type IndexFromAt<T> = <J, B>(at: m.At<T, J, Option<B>>) => m.Index<T, J, B>

interface PrismFromPredicate<S> {
  <A extends S>(refinement: Refinement<S, A>): m.Prism<S, A>
  (predicate: Predicate<S>): m.Prism<S, S>
}

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

const staticMonocle = makeMonocleFor<any>()
export const MonocleFor = <A>(): MonocleFor<A> => staticMonocle
