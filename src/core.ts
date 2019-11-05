import { Kind, URIS, URIS2, Kind2 } from './HKT'

export type OfType<F extends URIS, A> = Kind<F, A>
export type AnyType<F extends URIS> = Kind<F, any>
export type TypeOfA<X extends any> = X extends OfType<infer _, infer A> ? A : never

export type OfType2<F extends URIS2, L, A> = Kind2<F, L, A>
export type AnyType2<F extends URIS2> = Kind2<F, any, any>
export type TypeOfA2<X extends any> = X extends OfType2<infer _, infer A, any> ? A : never
export type TypeOfL2<X extends any> = X extends OfType2<infer _, any, infer L> ? L : never

export interface AnyTypeDic<F extends URIS> {
  [k: string]: Kind<F, any>
}

/**
 * This is necessary to help fixing F type for inference
 */
export interface InterpreterFor<F extends URIS> {
  readonly InterpreterType: F
}
export type InterpreterOf<F extends URIS, O extends object> = InterpreterFor<F> & O
export const InterpreterFor = <K extends URIS>(k: K) => <O extends object>(o: O): InterpreterOf<K, O> =>
  Object.assign({}, o, { InterpreterType: k })

export interface InterpreterFor2<F extends URIS2> {
  readonly InterpreterType: F
}
export type InterpreterOf2<F extends URIS2, O extends object> = InterpreterFor2<F> & O
export const InterpreterFor2 = <K extends URIS2>(k: K) => <O extends object>(o: O): InterpreterOf2<K, O> =>
  Object.assign({}, o, { InterpreterType: k })

export const cacheUnaryFunction = <K, V>(f: (k: K) => V) => {
  const mapping = new Map<K, V>()
  return (key: K): V => {
    const res = mapping.get(key)
    if (res !== undefined) {
      return res
    } else {
      const v = f(key)
      mapping.set(key, v)
      return v
    }
  }
}
