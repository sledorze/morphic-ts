import { Match, FStruct } from './function'

export const URI = 'Matcher'
export type URI = typeof URI

export const makeMatcher = <A>() => new MatcherType<A>()
export type MatcherValue<B extends MatcherType<any>> = B extends MatcherType<infer A> ? A : never

export class MatcherType<A> {
  fold<R>(f: (a: A) => R): (a: A) => R {
    return f
  }
  foldOn<D extends keyof A>(discr: D): <R>(match: Match<FStruct<A>[D], R>) => (a: A) => R {
    return match => a => match[a[discr]](a as any)
  }
  foldOnWiden<D extends keyof A>(
    discr: D
  ): <M extends Match<FStruct<A>[D], any>>(match: M) => (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never {
    return match => a => match[a[discr]](a)
  }
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Matcher: MatcherType<A>
  }
}
