import { identity } from 'fp-ts/lib/function'

type ValueByKeyByTag<Union extends Record<any, any>, Tags extends keyof Union = keyof Union> = {
  [Tag in Tags]: { [Key in Union[Tag]]: Union extends { [r in Tag]: Key } ? Union : never }
}

type Cases<Record, R> = { [key in keyof Record]: (v: Record[key]) => R }

type Folder<A> = <R>(f: (a: A) => R) => (a: A) => R

interface Lazy<R> {
  default: () => R
}
/**
 * Dispatch calls for each tag value, ensuring a common result type `R`
 */
interface Matcher<A, Tag extends keyof A & string> extends MatcherInter<A, ValueByKeyByTag<A>[Tag]> {}
interface MatcherInter<A, Record> {
  <R>(match: Cases<Record, R>): (a: A) => R
  // tslint:disable-next-line: unified-signatures
  <R>(match: Partial<Cases<Record, R>> & Lazy<R>): (a: A) => R
}
/**
 * Same purpose as `Matcher` but the result type is infered as a union of all branches results types
 */
interface MatcherWiden<A, Tag extends keyof A & string> extends MatcherWidenIntern<A, ValueByKeyByTag<A>[Tag]> {}

interface MatcherWidenIntern<A, Record> {
  <M extends Cases<Record, any>>(match: M): (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never
  <M extends Partial<Cases<Record, any>> & Lazy<any>>(match: M): (
    a: A
  ) => ReturnType<NonNullable<M[keyof M]>> extends infer R ? R : never
}

/**
 * Dispatch calls for each tag value, ensuring a common result type `R`
 */
// type PartialMatcher<A, Tag extends keyof A & string> = <R>(match: Cases<ValueByKeyByTag<A>[Tag], R>) => (a: A) => R

export interface Matchers<A, Tag extends keyof A & string> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
}

export const Matchers = <A, Tag extends keyof A & string>(tag: Tag): Matchers<A, Tag> => {
  const match = (match: any) => (a: any) => {
    const key = a[tag]
    if (key in match) {
      match[key](a)
    } else {
      match['default'](a)
    }
  }
  const matchWiden = match
  const fold = identity
  return {
    match,
    matchWiden,
    fold
  }
}
