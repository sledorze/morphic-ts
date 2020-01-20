export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }
export type ElemType<A> = A extends Array<infer E> ? E : never

export type ExtractUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Extract<A, Record<Tag, Tags>>

export type ExcludeUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Exclude<A, Record<Tag, Tags>>
