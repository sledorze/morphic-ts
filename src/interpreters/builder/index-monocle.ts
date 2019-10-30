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
type LenseFromOptionProp<S> = <P extends OptionPropertyNames<S>>(prop: P) => m.Optional<S, OptionPropertyType<S, P>> //
type LenseFromNullableProp<S> = <K extends keyof S>(k: K) => m.Optional<S, NonNullable<S[K]>>
type IndexFromAt<T> = <J, B>(at: m.At<T, J, Option<B>>) => m.Index<T, J, B>

interface PrismFromPredicate<S> {
  <S>(predicate: Predicate<S>): m.Prism<S, S>
  <S, A extends S>(refinement: Refinement<S, A>): m.Prism<S, A>
}

export interface MonocleFor<S> {
  fromProp: LenseFromProp<S>
  fromProps: LenseFromProps<S>
  fromPath: m.LensFromPath<S>
  fromAt: IndexFromAt<S>
  fromOptionProp: LenseFromOptionProp<S>
  fromNullableProp: LenseFromNullableProp<S>
  prism: m.Prism<Option<S>, S>
  fromPredicate: PrismFromPredicate<S>
}

const makeMonocleFor = <S>(): MonocleFor<S> => ({
  fromProp: m.Lens.fromProp(),
  fromProps: m.Lens.fromProps(),
  fromPath: m.Lens.fromPath(),
  fromAt: m.Index.fromAt,
  fromOptionProp: m.Optional.fromOptionProp(),
  fromNullableProp: m.Optional.fromNullableProp(),
  prism: m.Prism.some(),
  fromPredicate: m.Prism.fromPredicate
})

const staticMonocle = makeMonocleFor<any>()
export const MonocleFor = <A>(): MonocleFor<A> => staticMonocle
