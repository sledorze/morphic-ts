import { either as E } from 'fp-ts'
import { option as O } from 'fp-ts'
import { array as A } from 'fp-ts'
import { monoidAll } from 'fp-ts/lib/Monoid'
import { pipe } from 'fp-ts/lib/pipeable'
import type { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { tuple } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export interface Recycle<A> {
  recycle: (prev: A, next: A) => A
}

const recycleAnyToNext: Recycle<any> = {
  recycle: (_prev: any, next: any) => next
}

export const fromRecycle = <A>(recycle: (prev: A, next: A) => A): Recycle<A> => ({
  recycle: (prev, next) => (prev === next ? prev : recycle(prev, next))
})

/**
 *  @since 0.0.1
 * recyclePrimitive always returns the next version as there's no reference for primitives
 */
export const recyclePrimitive = <A>(): Recycle<A> => recycleAnyToNext

/**
 *  @since 0.0.1
 */
export const recycleBoolean = recyclePrimitive<boolean>()
/**
 *  @since 0.0.1
 */
export const recycleString = recyclePrimitive<string>()
/**
 *  @since 0.0.1
 */
export const recycleNumber = recyclePrimitive<number>()
/**
 *  @since 0.0.1
 */
export const recycleBigint = recyclePrimitive<bigint>()

/**
 *  @since 0.0.1
 */
export const contramap = <A, B>(recycle: Recycle<A>, f: (b: B) => A): Recycle<B> =>
  fromRecycle((prev, next) => {
    const fPrev = f(prev)
    return recycle.recycle(fPrev, f(next)) === fPrev ? prev : next
  })

/**
 *  @since 0.0.1
 */
export const getOption = <A>(recycle: Recycle<A>): Recycle<O.Option<A>> =>
  fromRecycle((prev, next) => {
    if (prev._tag === 'Some' && next._tag === 'Some') {
      const r = recycle.recycle(prev.value, next.value)
      return r === prev.value ? prev : next.value === r ? next : O.some(r)
    } else {
      return next
    }
  })

/**
 *  @since 0.0.1
 */
export const getArray = <A>(recycle: Recycle<A>): Recycle<A[]> =>
  fromRecycle((prev, next) =>
    prev.length !== next.length
      ? next
      : // TODO: Optimize
      pipe(
          A.zip(prev, next),
          A.foldMap(monoidAll)(([p, n]) => recycle.recycle(p, n) === p)
        )
      ? prev
      : next
  )

/**
 *  @since 0.0.1
 */
export const getEither = <A, E>(recycleE: Recycle<E>, recycleA: Recycle<A>): Recycle<E.Either<E, A>> =>
  fromRecycle((prev, next) => {
    if (prev._tag === next._tag) {
      if (prev._tag === 'Right') {
        const pr = prev.right
        const nr = (next as E.Right<A>).right
        const r = recycleA.recycle(pr, nr)
        return pr === r ? prev : nr === r ? next : E.right(r)
      } else {
        const pl = prev.left
        const nl = (next as E.Left<E>).left
        const l = recycleE.recycle(pl, nl)
        return pl === l ? prev : nl === l ? next : E.left(l)
      }
    } else {
      return next
    }
  })

/**
 *  @since 0.0.1
 */
export const getStruct = <O extends ReadonlyRecord<string, any>>(
  recycles: {
    [K in keyof O]: Recycle<O[K]>
  }
): Recycle<O> => {
  const recyclesArr = Object.keys(recycles).map((k: keyof O) => tuple(k, recycles[k].recycle))
  return fromRecycle((prev, next) => {
    const res: O = {} as O
    let recyclable = true
    let isNext = true
    for (const [k, recycle] of recyclesArr) {
      const p = prev[k]
      const n = next[k]
      const r = recycle(p, n)
      res[k] = r
      if (r !== p) {
        recyclable = false
      }
      if (r !== n) {
        isNext = false
      }
    }
    return recyclable ? prev : isNext ? next : res
  })
}

/**
 *  @since 0.0.1
 */
export const getSet = <A>(_recycle: Recycle<A>): Recycle<Set<A>> =>
  fromRecycle(
    (_prev, next) => next // TODO: revise strategy
  )

/**
 *  @since 0.0.1
 */
export const getStrMap = <A>(recycle: Recycle<A>): Recycle<Record<string, A>> =>
  fromRecycle((prev, next) => {
    const prevKeys = Object.keys(prev)
    const nextKeys = Object.keys(next)
    if (prevKeys.length !== nextKeys.length) {
      return next
    } else {
      let recyclable = true
      // TODO: Optimize
      for (const k of prevKeys) {
        if (prev.hasOwnProperty(k)) {
          if (recycle.recycle(prev[k], next[k]) !== prev[k]) {
            recyclable = false
            break
          }
        }
      }
      return recyclable ? prev : next
    }
  })
