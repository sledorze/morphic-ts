import type { Remove, ExtractUnion } from './utils'
import type { KeysDefinition, Tagged } from '.'
import { mapWithIndex } from 'fp-ts/lib/Record'

/**
 *  @since 0.0.1
 */
export type CtorType<C extends Ctors<any, any>> = C extends Ctors<infer A, any> ? A : never

/**
 *  @since 0.0.1
 */
export type Of<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => A
}

/**
 *  @since 0.0.1
 */
export type As<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => ExtractUnion<A, Tag, key>
}

/**
 *  @since 0.0.1
 */
export interface Ctors<A, Tag extends keyof A & string> {
  tag: Tag
  of: Of<A, Tag>
  as: As<A, Tag>
  make: (a: A) => A
}

/**
 *  @since 0.0.1
 */
export const Ctors = <A extends Tagged<Tag>, Tag extends string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Ctors<A, Tag> => {
  const ctors = mapWithIndex((key, _) => (props: object) => ({
    ...props,
    [tag]: key
  }))(keys)
  return {
    of: ctors as Of<A, Tag>,
    as: ctors as As<A, Tag>,
    make: <A>(a: A) => a,
    tag
  }
}
