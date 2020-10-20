import { none } from 'fp-ts/lib/Option'
import { Lens, Optional } from 'monocle-ts'
import type { KeysDefinition } from '.'

type ValueByKeyByTag<Union extends Record<any, any>, Tags extends keyof Union = keyof Union> = {
  [Tag in Tags]: { [Key in Union[Tag]]: Union extends { [r in Tag]: Key } ? Union : never }
}

type Cases<Record, R> = { [key in keyof Record]: (v: Record[key]) => R }

interface Folder<A> {
  <R>(f: (a: A) => R): (a: A) => R
}

interface Transform<A, Tag extends keyof A> extends TransformInter<A, ValueByKeyByTag<A>[Tag]> {}
interface TransformInter<A, Record> {
  (match: Partial<Cases<Record, A>>): (a: A) => A
}

interface ReducerBuilder<S, A, Tag extends keyof A> {
  (match: Cases<ValueByKeyByTag<A>[Tag], (s: S) => S>): Reducer<S, A>
  // tslint:disable-next-line: unified-signatures
  <
    M extends Partial<Cases<ValueByKeyByTag<A>[Tag], (s: S) => S>>,
    D extends (
      _: { [k in keyof ValueByKeyByTag<A>[Tag]]: ValueByKeyByTag<A>[Tag][k] }[Exclude<
        keyof ValueByKeyByTag<A>[Tag],
        keyof M
      >]
    ) => (s: S) => S
  >(
    match: M,
    def: D
  ): Reducer<S, A>
}

interface PartialReducerBuilder<S, A, Tag extends keyof A> {
  // tslint:disable-next-line: unified-signatures
  <M extends Partial<Cases<ValueByKeyByTag<A>[Tag], (s: S) => S>>>(match: M): Reducer<S, A>
}

/**
 * Dispatch calls for each tag value, ensuring a common result type `R`
 */

interface MatcherStrict<A, Tag extends keyof A> extends MatcherStrictInter<A, ValueByKeyByTag<A>[Tag]> {}

declare type EmptyIfEmpty<R> = keyof R extends never ? {} : R

interface MatcherStrictInter<A, Rec> {
  <R>(match: Cases<Rec, R>): (a: A) => R
}

/**
 * Same purpose as `Matcher` but the result type is infered as a union of all branches results types
 */
interface MatcherWiden<A, Tag extends keyof A> extends MatcherWidenIntern<A, ValueByKeyByTag<A>[Tag]> {}

interface MatcherWidenIntern<A, Record> {
  <M extends Cases<Record, unknown>>(match: M): (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never
  <
    M extends Partial<Cases<Record, unknown>>,
    D extends (_: { [k in keyof Record]: Record[k] }[Exclude<keyof Record, keyof M>]) => any
  >(
    match: M,
    def: D
  ): (
    a: A
  ) =>
    | (ReturnType<NonNullable<M[keyof M]>> extends infer R ? R : never)
    | (unknown extends ReturnType<D> ? never : ReturnType<D>)
}

type LensCases<Record, R> = { [key in keyof Record]: Lens<Record[key], R> }
interface LensMatcher<A, Tag extends keyof A> extends LensMatcherInter<A, ValueByKeyByTag<A>[Tag]> {}
interface LensMatcherInter<A, Rec> {
  <R>(match: LensCases<Rec, R>): Lens<A, R>
}

type OptionalCases<Record, R> = { [key in keyof Record]?: Optional<Record[key], R> }
interface OptionalMatcher<A, Tag extends keyof A> extends OptionalMatcherInter<A, ValueByKeyByTag<A>[Tag]> {}
interface OptionalMatcherInter<A, Rec> {
  <R>(match: OptionalCases<Rec, R>): Optional<A, R>
}

/**
 *  @since 0.0.1
 */
export interface Reducer<S, A> {
  (state: S | undefined, action: A): S
}

/**
 *  @since 0.0.1
 */
export interface Matchers<A, Tag extends keyof A> {
  /** Folds to a value */
  fold: Folder<A>
  /** Transforms partial values to the same type */
  transform: Transform<A, Tag>
  /** Matcher which is widens its Return type (infers a Union of all branches), supports a default as last parameter */
  match: MatcherWiden<A, Tag>
  /**
   * Matcher which is strict in its Return type (should be the same for all branches)
   */
  matchStrict: MatcherStrict<A, Tag>
  /**
   * Matcher which composes lenses across different cases (all cases must be specified)
   */
  matchLens: LensMatcher<A, Tag>
  /**
   * Matcher which composes optionals across different cases (undesired cases can be omitted)
   */
  matchOptional: OptionalMatcher<A, Tag>
  /** Creates a reducer enabling State evolution */
  createReducer: <S>(initialState: S) => ReducerBuilder<S, A, Tag>
  createPartialReducer: <S>(initialState: S) => PartialReducerBuilder<S, A, Tag>
  /** Enforces the inner function to return a specificiable type */
  strict: <R>(f: (_: A) => R) => (_: A) => R
}

/**
 *  @since 0.0.1
 */
export const Matchers = <A, Tag extends keyof A>(tag: Tag) => (keys: KeysDefinition<A, Tag>): Matchers<A, Tag> => {
  const match = (match: any, def?: any) => (a: any): any => (match[a[tag]] || def)(a)
  const matchLens = (cases: any) =>
    new Lens(
      (s: any) => cases[s[tag]].get(s),
      (a: any) => (s: any) => cases[s[tag]].set(a)(s)
    )
  const matchOptional = (cases: any) =>
    new Optional(
      (s: any) => {
        const optionalCase = cases[s[tag]]
        return optionalCase !== undefined ? optionalCase.getOption(s) : none
      },
      (a: any) => (s: any) => {
        const optionalCase = cases[s[tag]]
        return optionalCase !== undefined ? optionalCase.set(a)(s) : s
      }
    )
  const transform = (match: any) => (a: any): any => {
    const c = match[a[tag]]
    return c ? c(a) : a
  }
  const fold = <A>(a: A) => a
  const createReducer = <S>(initialState: S): ReducerBuilder<S, A, Tag> => (m: any, def?: any) => {
    const matcher = match(m, def || ((_a: any) => (s: S) => s))
    return (s: any, a: any) => {
      const state = s === undefined ? initialState : s
      return a[tag] in keys ? matcher(a)(state) : state
    }
  }
  return {
    matchStrict: match,
    match,
    transform,
    fold,
    createReducer,
    createPartialReducer: createReducer,
    strict: <A>(a: A) => a,
    matchLens,
    matchOptional
  }
}
