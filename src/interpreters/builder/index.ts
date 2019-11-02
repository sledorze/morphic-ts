import { identity } from 'fp-ts/lib/function'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

export class BuilderType<A> {
  constructor(public build: Builder<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Builder: BuilderType<A>
  }
}
