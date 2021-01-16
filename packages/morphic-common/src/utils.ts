import type { Either } from 'fp-ts/lib/Either'
import { collect as Rcollect, record } from 'fp-ts/Record'

import type { UnionToIntersection } from './core'

/**
 *  @since 0.0.1
 */
export const mapRecord = <Dic extends { [k in keyof Dic]: any }, B>(
  d: Dic,
  f: (v: Dic[keyof Dic]) => B
): { [k in keyof Dic]: B } => record.map(d, f) as { [k in keyof Dic]: B }

/**
 *  @since 0.0.1
 */
export const projectField = <T extends Record<any, Record<any, any>>>(t: T) => <K extends keyof T[keyof T]>(
  k: K
): {
  [q in keyof T]: T[q][K]
} =>
  record.map(t, p => p[k]) as {
    [q in keyof T]: T[q][K]
  }

/**
 *  @since 0.0.1
 */
export const projectFieldWithEnv = <T extends Record<any, (e: R, c: C) => Record<any, any>>, R, C>(
  t: T,
  env: R,
  c: C
) => <K extends keyof ReturnType<T[keyof T]>>(
  k: K
): {
  [q in keyof T]: ReturnType<T[q]>[K]
} =>
  record.map(t, p => p(env, c)[k]) as {
    [q in keyof T]: ReturnType<T[q]>[K]
  }

/**
 *  @since 0.0.1
 */
export const merge = <R extends unknown[]>(...x: R): UnionToIntersection<R[number]> => Object.assign({}, ...x)

/**
 *  @since 0.0.1
 */
export const collect = <K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B> => Rcollect(f)(d)

/**
 *  @since 0.0.1
 */
export const memo: <F extends () => any>(get: F) => typeof get = <F extends () => any>(get: F): typeof get => {
  type A = ReturnType<F>
  let cache: A | undefined = undefined
  return ((): A => {
    if (cache === undefined) {
      cache = get()
    }
    return cache as A
  }) as any
}

/**
 *  @since 0.0.1
 */
export type IsNever<X, Y, N> = 'X' | X extends 'X' ? Y : N

/**
 *  @since 0.0.1
 */
export type Includes<A, B, Y, N> = IsNever<B, Y, A extends B ? Y : N>

/**
 *  @since 0.0.1
 *
 * Returns a function returning the index of the first guard matching a particular Objet
 * Caching the result under the given Symbol inside the Object
 */
export const getGuardId = (guards: ((x: unknown) => Either<any, any>)[], sym: symbol): ((a: unknown) => number) => {
  const len = guards.length
  return (a: any): number => {
    const isObj = typeof a === 'object' && a !== null
    if (isObj) {
      const r: number | undefined = a[sym]
      if (r !== undefined) {
        return r
      }
    }
    for (let i = 0; i < len; i++) {
      if (guards[i](a)._tag === 'Right') {
        if (isObj) {
          a[sym] = i
        }
        return i
      }
    }
    return -1
  }
}
