import { RecycleURI } from './hkt';
export * from './model';
export { RecycleURI };
/**
 * @since 0.0.1
 */
export declare const recycleApplyConfig: <E, A, R extends Record<"RecycleURI", any>>(config?: {
    RecycleURI?: import("@morphic-ts/common/lib/config").GenConfig<import("./recycle").Recycle<A>, R> | undefined;
} | undefined) => import("@morphic-ts/common/lib/config").GenConfig<import("./recycle").Recycle<A>, R>;
