import { merge } from '@morphic-ts/common/lib/utils'
import { ioTsNonStrictObjectInterpreter, ioTsStrictObjectInterpreter } from './model/object'
import { ioTsRefinedInterpreter } from './model/refined'
import { ioTsNewtypeInterpreter } from './model/newtype'
import { ioTsUnknownInterpreter } from './model/unknown'
import { ioTsPrimitiveInterpreter } from './model/primitives'
import { ioTsIntersectionInterpreter } from './model/intersections'
import { ioTsUnionInterpreter } from './model/unions'
import { ioTsTaggedUnionInterpreter } from './model/tagged-unions'
import { ioTsStrMapInterpreter } from './model/str-map'
import { ioTsSetInterpreter } from './model/set'
import { ioTsRecursiveInterpreter } from './model/recursive'
import { ioTsTermInterpreter } from './model/term'
export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelBaseIoTs = merge(
  ioTsRefinedInterpreter,
  ioTsNewtypeInterpreter,
  ioTsUnknownInterpreter,
  ioTsPrimitiveInterpreter,
  ioTsIntersectionInterpreter,
  ioTsUnionInterpreter,
  ioTsTaggedUnionInterpreter,
  ioTsStrMapInterpreter,
  ioTsSetInterpreter,
  ioTsRecursiveInterpreter,
  ioTsTermInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelIoTsNonStrictInterpreter = merge(allModelBaseIoTs, ioTsNonStrictObjectInterpreter)

/**
 *  @since 0.0.1
 */
export const modelIoTsStrictInterpreter = merge(allModelBaseIoTs, ioTsStrictObjectInterpreter)
