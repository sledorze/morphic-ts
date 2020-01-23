import { identity } from 'fp-ts/lib/function'
import { KeysDefinition, isIn } from '.'

type ValueByKeyByTag<Union extends Record<any, any>, Tags extends keyof Union = keyof Union> = {
  [Tag in Tags]: { [Key in Union[Tag]]: Union extends { [r in Tag]: Key } ? Union : never }
}

type Cases<Record, R> = { [key in keyof Record]: (v: Record[key]) => R }

interface Folder<A> {
  <R>(f: (a: A) => R): (a: A) => R
}

interface Default<A, R> {
  default: (a: A) => R
}
/**
 * Dispatch calls for each tag value, ensuring a common result type `R`
 */
interface Matcher<A, Tag extends keyof A> extends MatcherInter<A, ValueByKeyByTag<A>[Tag]> {}
interface MatcherInter<A, Record> {
  <R>(match: Cases<Record, R>): (a: A) => R
  // tslint:disable-next-line: unified-signatures
  <R>(match: Partial<Cases<Record, R>> & Default<A, R>): (a: A) => R
}

interface Transform<A, Tag extends keyof A> extends TransformInter<A, ValueByKeyByTag<A>[Tag]> {}
interface TransformInter<A, Record> {
  (match: Partial<Cases<Record, A>>): (a: A) => A
}

interface ReducerBuilder<S, A, Tag extends keyof A> {
  (match: Cases<ValueByKeyByTag<A>[Tag], (s: S) => S>): Reducer<S, A>
  // tslint:disable-next-line: unified-signatures
  (match: Partial<Cases<ValueByKeyByTag<A>[Tag], (s: S) => S>> & Default<A, (s: S) => S>): Reducer<S, A>
}

/**
 * Same purpose as `Matcher` but the result type is infered as a union of all branches results types
 */
interface MatcherWiden<A, Tag extends keyof A> extends MatcherWidenIntern<A, ValueByKeyByTag<A>[Tag]> {}

interface MatcherWidenIntern<A, Record> {
  <M extends Cases<Record, any>>(match: M): (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never
  <M extends Partial<Cases<Record, any>> & Default<A, any>>(match: M): (
    a: A
  ) => ReturnType<NonNullable<M[keyof M]>> extends infer R ? R : never
}

export interface Reducer<S, A> {
  (state: S | undefined, action: A): S
}

export interface Matchers<A, Tag extends keyof A> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  transform: Transform<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
  createReducer: <S>(initialState: S) => ReducerBuilder<S, A, Tag>
}

export const Matchers = <A, Tag extends keyof A>(tag: Tag) => (keys: KeysDefinition<A, Tag>): Matchers<A, Tag> => {
  const inKeys = isIn(keys)
  const match = (match: any) => (a: any): any => (match[a[tag]] || match['default'])(a)
  const transform = (match: any) => (a: any): any => {
    const c = match[a[tag]]
    return c ? c(a) : a
  }
  const matchWiden = match
  const fold = identity
  const createReducer = <S>(initialState: S): ReducerBuilder<S, A, Tag> => (m: any) => {
    const matcher = match(m)
    return (s: any, a: any) => {
      const state = s === undefined ? initialState : s
      return inKeys(a[tag]) ? matcher(a)(state) : state
    }
  }
  return {
    match,
    matchWiden,
    transform,
    fold,
    createReducer
  }
}
