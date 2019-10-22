export type Compact<A> = { [k in keyof A]: A[k] }

export type FStruct<R extends Record<any, any>, K extends keyof R = keyof R> = {
  [k in K]: { [kv in R[k]]: R extends { [r in k]: kv } ? Compact<R> : never }
}

export type Match<StructK, R> = { [KV in keyof StructK]: (v: StructK[KV]) => R }

export const folderWiden = <A extends object>() => <D extends keyof A>(discr: D) => <
  M extends Match<FStruct<A>[D], any>
>(
  match: M
) => (a: A): M[keyof M] extends (a: any) => infer R ? R : never => match[a[discr]](a)
/**
 * Usage
 *
 *    type A = { type: 'left'; leftValue: string } | { type: 'right'; rightValue: string }
 *
 *    folder<A>()('type')<string>({
 *      left: ({ leftValue }) => leftValue,
 *      right: ({ rightValue }) => rightValue
 *    })
 *
 */
export const folder = <A extends object>() => <D extends keyof A>(discr: D) => <R>(match: Match<FStruct<A>[D], R>) => (
  a: A
): R => match[a[discr]](a as any)
