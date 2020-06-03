import type { Either } from 'fp-ts/es6/Either';
import type { Option } from 'fp-ts/es6/Option';
/**
 *  @since 0.0.1
 */
export interface Recycle<A> {
    recycle: (prev: A, next: A) => A;
}
export declare const fromRecycle: <A>(recycle: (prev: A, next: A) => A) => Recycle<A>;
/**
 *  @since 0.0.1
 * recyclePrimitive always returns the next version as there's no reference for primitives
 */
export declare const recyclePrimitive: <A>() => Recycle<A>;
/**
 *  @since 0.0.1
 */
export declare const recycleBoolean: Recycle<boolean>;
/**
 *  @since 0.0.1
 */
export declare const recycleString: Recycle<string>;
/**
 *  @since 0.0.1
 */
export declare const recycleNumber: Recycle<number>;
/**
 *  @since 0.0.1
 */
export declare const recycleBigint: Recycle<bigint>;
/**
 *  @since 0.0.1
 */
export declare const contramap: <A, B>(recycle: Recycle<A>, f: (b: B) => A) => Recycle<B>;
/**
 *  @since 0.0.1
 */
export declare const getOption: <A>(recycle: Recycle<A>) => Recycle<Option<A>>;
/**
 *  @since 0.0.1
 */
export declare const getArray: <A>(recycle: Recycle<A>) => Recycle<A[]>;
/**
 *
 */
export declare const getArrayByKey: <A>(getKey: (a: A) => string) => (recycle: Recycle<A>) => Recycle<A[]>;
/**
 *  @since 0.0.1
 */
export declare const getEither: <A, E>(recycleE: Recycle<E>, recycleA: Recycle<A>) => Recycle<Either<E, A>>;
/**
 *  @since 0.0.1
 */
export declare const getStruct: <O extends Readonly<Record<string, any>>>(recycles: { [K in keyof O]: Recycle<O[K]>; }) => Recycle<O>;
/**
 *  @since 0.0.1
 */
export declare const getPartialStruct: <O extends Readonly<Record<string, any>>>(recycles: { [K in keyof O]: Recycle<O[K]>; }) => Recycle<O>;
/**
 *  @since 0.0.1
 */
export declare const getSet: <A>(_recycle: Recycle<A>) => Recycle<Set<A>>;
export declare const setToRecord: <A>(f: (a: A) => string) => (s: Set<A>) => {
    uniq: Record<string, A>;
    colliding: Record<string, A[]>;
};
/**
 *  @since 0.0.1
 */
export declare const getStrMap: <A>({ recycle }: Recycle<A>) => Recycle<Record<string, A>>;
/**
 *  @since 0.0.1
 */
export declare const getSetByKey: <A>(getKey: (a: A) => string) => (recycle: Recycle<A>) => Recycle<Set<A>>;
