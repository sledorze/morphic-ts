import { Kind, URIS, URIS2, Kind2 } from './HKT'
import { Algebra as AlgAlgebra, Algebra1 as AlgAlgebra1, Algebra2 as AlgAlgebra2, AlgebraURIS } from './algebras/hkt'

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
export function InterpreterFor<K extends URIS>(k: K): <O extends object>(o: O) => InterpreterOf<K, O> {
  return o => Object.assign({}, o, { InterpreterType: k })
}
export interface InterpreterFor2<F extends URIS2> {
  readonly InterpreterType: F
}
export type InterpreterOf2<F extends URIS2, O extends object> = InterpreterFor2<F> & O
export function InterpreterFor2<K extends URIS2>(k: K): <O extends object>(o: O) => InterpreterOf2<K, O> {
  return o => Object.assign({}, o, { InterpreterType: k })
}

type Function1 = (a: any) => any
export type CacheType = <F extends Function1>(f: F) => F

export function cacheUnaryFunction<F extends Function1>(f: F) {
  type K = F extends (a: infer K) => any ? K : any
  type V = F extends (a: any) => infer V ? V : any
  const mapping = new Map<K, V>()
  const fres = (key: K): V => {
    const res = mapping.get(key)
    if (res !== undefined) {
      return res
    } else {
      const v = f(key)
      mapping.set(key, v)
      return v
    }
  }
  return fres as F
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type GetAlgebra<A extends AlgebraURIS> = A

export type Algebra<AllAlgebra extends AlgebraURIS, Interp> = UnionToIntersection<AlgAlgebra<Interp>[AllAlgebra]>
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS> = UnionToIntersection<
  AlgAlgebra1<Interp>[AllAlgebra]
> &
  InterpreterFor<Interp>
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2> = UnionToIntersection<
  AlgAlgebra2<Interp>[AllAlgebra]
> &
  InterpreterFor2<Interp>

export type Compact<A> = {
  [K in keyof A]: A[K]
}

export type KeepNotUndefined<O> = UnionToIntersection<
  NonNullable<{ [k in keyof O]: undefined extends O[k] ? never : { [x in k]: O[k] } }[keyof O]>
>
type KeepOptionalIfUndefined<O> = UnionToIntersection<
  NonNullable<{ [k in keyof O]: undefined extends O[k] ? { [x in k]?: O[k] } : never }[keyof O]>
>
export type OptionalIfUndefined<T> = Compact<KeepNotUndefined<T> & KeepOptionalIfUndefined<T>>

/**
 * Expose Configuration type for (a) specific interpreter(s) types
 */
export type ByInterp<Config, Interp extends URIS | URIS2> = MaybeUndefinedIfOptional<
  OptionalIfUndefined<
    {
      [I in Interp]: I extends keyof Config ? Config[I] : undefined
    }
  >
>

export type MaybeUndefinedIfOptional<X> = keyof KeepNotUndefined<X> extends never ? X | undefined : X

export type isOptionalConfig<C, Y, N> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends never ? Y : N
