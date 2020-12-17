/**
 *  @since 0.0.1
 */
export type Array<T> = ReadonlyArray<T>

/**
 *  @since 0.0.1
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
