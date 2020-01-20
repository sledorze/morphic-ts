import { InterpreterFor } from '../../common/core'
import { merge } from '../../common/utils'
import { builderPrimitiveInterpreter } from './primitives'
import { builderIntersectionInterpreter } from './intersections'
import { builderUnionInterpreter } from './unions'
import { builderObjectInterpreter } from './object'
import { builderTaggedUnionInterpreter } from './tagged-unions'
import { builderRecursiveInterpreter } from './recursive'
import { builderStrMapInterpreter } from './str-map'
import { builderSetInterpreter } from './set'
import { BuilderURI } from '.'
export { BuilderURI }

export const defineBuilderInterpreter = InterpreterFor(BuilderURI)

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
