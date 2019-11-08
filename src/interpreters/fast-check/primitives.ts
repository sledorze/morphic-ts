import * as fc from 'fast-check'
import { FastCheckType, URI } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { fromNullable } from 'fp-ts/lib/Option'

export const fastCheckPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new FastCheckType(() => fc.integer().map(n => new Date(n))),
  boolean: new FastCheckType(() => fc.boolean()),
  string: new FastCheckType(() => fc.string()),
  number: new FastCheckType(() => fc.float()),
  stringLiteral: l => new FastCheckType(() => fc.constant(l)),
  keysOf: k => new FastCheckType(() => fc.oneof(...(Object.keys(k) as (keyof typeof k)[]).map(k => fc.constant(k)))),
  nullable: T => new FastCheckType(() => fc.option(T.arb()).map(fromNullable)),
  array: T => new FastCheckType(() => fc.array(T.arb()))
}
