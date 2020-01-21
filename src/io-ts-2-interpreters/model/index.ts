import { merge } from '../../common/utils'
import { ioTs2PrimitiveInterpreter } from './primitives'
import { ioTs2IntersectionInterpreter } from './intersections'
import { ioTs2UnionInterpreter } from './unions'
import { ioTs2TaggedUnionInterpreter } from './tagged-unions'
import { ioTs2StrMapInterpreter } from './str-map'
import { ioTs2SetInterpreter } from './set'
import { ioTs2RecursiveInterpreter } from './recursive'

export const allModelBaseIoTs = merge(
  ioTs2PrimitiveInterpreter,
  ioTs2IntersectionInterpreter,
  ioTs2UnionInterpreter,
  ioTs2TaggedUnionInterpreter,
  ioTs2StrMapInterpreter,
  ioTs2SetInterpreter,
  ioTs2RecursiveInterpreter
)
