import { identity } from 'fp-ts/lib/function'

export const BuilderURI = Symbol()
export type BuilderURI = typeof BuilderURI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

export class BuilderType<A> {
  constructor(public build: Builder<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [BuilderURI]: BuilderType<A>
  }
}
