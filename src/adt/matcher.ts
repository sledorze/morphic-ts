import { identity } from 'fp-ts/lib/function'

type ValueByKeyByTag<Union extends Record<any, any>, Tags extends keyof Union = keyof Union> = {
  [Tag in Tags]: { [Key in Union[Tag]]: Union extends { [r in Tag]: Key } ? Union : never }
}

type Cases<Record, R> = { [key in keyof Record]: (v: Record[key]) => R }

type Folder<A> = <R>(f: (a: A) => R) => (a: A) => R

/**
 * Dispatch calls for each tag value, ensuring a common result type `R`
 */
type Matcher<A, Tag extends keyof A & string> = <R>(match: Cases<ValueByKeyByTag<A>[Tag], R>) => (a: A) => R

/**
 * Same purpose as `Matcher` but the result type is infered as a union of all branches results types
 */
type MatcherWiden<A, Tag extends keyof A & string> = <M extends Cases<ValueByKeyByTag<A>[Tag], any>>(
  match: M
) => (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never

export interface Matchers<A, Tag extends keyof A & string> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
}

export const Matchers = <A, Tag extends keyof A & string>(tag: Tag): Matchers<A, Tag> => {
  const match = (match: any) => (a: any) => match[a[tag]](a)
  const matchWiden = match
  const fold = identity
  return {
    match,
    matchWiden,
    fold
  }
}
