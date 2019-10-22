import { record } from 'fp-ts'

export const mapRecord = <Dic extends { [k in keyof Dic]: any }, B>(
  d: Dic,
  f: (v: Dic[keyof Dic]) => B
): { [k in keyof Dic]: B } => record.record.map(d, f) as { [k in keyof Dic]: B }

export const projectField = <T extends Record<any, Record<any, any>>>(t: T) => <K extends keyof T[keyof T]>(
  k: K
): {
  [q in keyof T]: T[q][K]
} =>
  record.record.map(t, p => p[k]) as {
    [q in keyof T]: T[q][K]
  }

export type NonNullValues<O> = { [k in keyof O]: O[k] extends undefined ? never : O[k] }

export function conjunction<A, B>(...x: [A, B]): A & B
export function conjunction<A, B, C>(...x: [A, B, C]): A & B & C
export function conjunction<A, B, C, D>(...x: [A, B, C, D]): A & B & C & D
export function conjunction<A, B, C, D, E>(...x: [A, B, C, D, E]): A & B & C & D & E
export function conjunction<A, B, C, D, E, F>(...x: [A, B, C, D, E, F]): A & B & C & D & E & F
export function conjunction<A, B, C, D, E, F, G>(...x: [A, B, C, D, E, F, G]): A & B & C & D & E & F & G
export function conjunction<A, B, C, D, E, F, G, H>(...x: [A, B, C, D, E, F, G, H]): A & B & C & D & E & F & G & H
export function conjunction<A, B, C, D, E, F, G, H, I>(
  ...x: [A, B, C, D, E, F, G, H, I]
): A & B & C & D & E & F & G & H & I
export function conjunction<R extends unknown[]>(...x: R): any[] {
  return Object.assign({}, ...x)
}

export const merge = conjunction

export const collect = <K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B> => record.collect(f)(d)

export const mapTupled = <T, U>(xs: [T, T, ...T[]], f: (x: T) => U): [U, U, ...U[]] => xs.map(f) as any
