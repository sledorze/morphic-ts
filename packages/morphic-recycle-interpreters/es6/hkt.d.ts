import type { Recycle } from './recycle';
/**
 *  @since 0.0.1
 */
export declare const RecycleURI: "RecycleURI";
/**
 *  @since 0.0.1
 */
export declare type RecycleURI = typeof RecycleURI;
declare module '@morphic-ts/common/lib/config' {
    interface ConfigType<E, A> {
        [RecycleURI]: Recycle<A>;
    }
}
/**
 *  @since 0.0.1
 */
export declare class RecycleType<A> {
    recycle: Recycle<A>;
    _A: A;
    _URI: RecycleURI;
    constructor(recycle: Recycle<A>);
}
declare module '@morphic-ts/common/lib/HKT' {
    interface URItoKind<R, A> {
        [RecycleURI]: (env: R) => RecycleType<A>;
    }
}
