import { InterpreterFor } from '../../core'
import { merge } from '../../utils'
import { matcherPrimitiveInterpreter } from './primitives'
import { matcherIntersectionInterpreter } from './intersections'
import { matcherUnionInterpreter } from './unions'
import { matcherObjectInterpreter } from './object'
import { matcherTaggedUnionInterpreter } from './tagged-unions'
import { matcherRecursiveInterpreter } from './recursive'
import { matcherCollectionInterpreter } from './collections'

export const defineMatcherInterpreter = InterpreterFor('Matcher')

export const matcherInterpreter = defineMatcherInterpreter(
  merge(
    matcherPrimitiveInterpreter,
    matcherIntersectionInterpreter,
    matcherUnionInterpreter,
    matcherObjectInterpreter,
    matcherTaggedUnionInterpreter,
    matcherRecursiveInterpreter,
    matcherCollectionInterpreter
  )
)
