import { InterpreterFor } from '../../core'
import { merge } from '../../utils'
import { builderPrimitiveInterpreter } from './primitives'
import { builderIntersectionInterpreter } from './intersections'
import { builderUnionInterpreter } from './unions'
import { builderObjectInterpreter } from './object'
import { builderTaggedUnionInterpreter } from './tagged-unions'
import { builderRecursiveInterpreter } from './recursive'
import { builderStrMapInterpreter } from './str-map'
import { builderSetInterpreter } from './set'

export const defineBuilderInterpreter = InterpreterFor('Builder')

export const builderInterpreter = defineBuilderInterpreter(
  merge(
    builderPrimitiveInterpreter,
    builderIntersectionInterpreter,
    builderUnionInterpreter,
    builderObjectInterpreter,
    builderTaggedUnionInterpreter,
    builderRecursiveInterpreter,
    builderStrMapInterpreter,
    builderSetInterpreter
  )
)
