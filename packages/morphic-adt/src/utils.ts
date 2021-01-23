/**
 *  @since 0.0.1
 */
export type ElemType<A> = A extends Array<infer E> ? E : never

/**
 *  @since 0.0.1
 */
export type ExtractUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Extract<A, Record<Tag, Tags>>

/**
 *  @since 0.0.1
 */
export type ExcludeUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Exclude<A, Record<Tag, Tags>>
