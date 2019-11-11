import { Remove, ExtractUnion } from '../common'
import { identity } from 'fp-ts/lib/function'
import { KeysDefinition } from '.'
import { record } from 'fp-ts'

export type CtorType<C extends Ctors<any, any>> = C extends Ctors<infer A, any> ? A : never

export type Of<A, Tag extends keyof A & string> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => A
}

export type As<A, Tag extends keyof A & string> = {
  [key in A[Tag] & string]: (a: Remove<ExtractUnion<A, Tag, key>, Tag>) => ExtractUnion<A, Tag, key>
}

export interface Ctors<A, Tag extends keyof A & string> {
  of: Of<A, Tag>
  as: As<A, Tag>
  make: (a: A) => A
}

export const Ctors = <A, Tag extends keyof A & string>(tag: Tag) => (keys: KeysDefinition<A, Tag>): Ctors<A, Tag> => {
  const ctors = record.mapWithIndex((key, _) => (props: any) => ({
    [tag]: key,
    ...props
  }))(keys)
  return {
    of: ctors as Ctors<A, Tag>['of'],
    as: ctors as Ctors<A, Tag>['as'],
    make: identity
  }
}
