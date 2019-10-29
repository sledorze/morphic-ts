import { identity } from 'fp-ts/lib/function'

type FStruct<R extends Record<any, any>, K extends keyof R = keyof R> = {
  [k in K]: { [kv in R[k]]: R extends { [r in k]: kv } ? R : never }
}

type Match<StructK, R> = { [KV in keyof StructK]: (v: StructK[KV]) => R }

type Folder<A> = <R>(f: (a: A) => R) => (a: A) => R
type Matcher<A, Tag extends keyof A & string> = <R>(match: Match<FStruct<A>[Tag], R>) => (a: A) => R
type MatcherWiden<A, Tag extends keyof A & string> = <M extends Match<FStruct<A>[Tag], any>>(
  match: M
) => (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never

export interface Matchers<A, Tag extends keyof A & string> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
}

export const makeMatchers = <A, Tag extends keyof A & string>(tag: Tag): Matchers<A, Tag> => {
  const match = (match: any) => (a: any) => match[a[tag]](a)
  const matchWiden = match
  const fold = identity
  return {
    match,
    matchWiden,
    fold
  }
}
