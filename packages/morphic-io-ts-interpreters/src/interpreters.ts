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
import { AnyEnv } from '@morphic-ts/common/lib/config'
export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelBaseIoTs = <Env extends AnyEnv>() =>
  merge(
    ioTsRefinedInterpreter<Env>(),
    ioTsNewtypeInterpreter<Env>(),
    ioTsUnknownInterpreter<Env>(),
    ioTsPrimitiveInterpreter<Env>(),
    ioTsIntersectionInterpreter<Env>(),
    ioTsUnionInterpreter<Env>(),
    ioTsTaggedUnionInterpreter<Env>(),
    ioTsStrMapInterpreter<Env>(),
    ioTsSetInterpreter<Env>(),
    ioTsRecursiveInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelIoTsNonStrictInterpreter = <Env extends AnyEnv>() =>
  merge(allModelBaseIoTs<Env>(), ioTsNonStrictObjectInterpreter<Env>())

/**
 *  @since 0.0.1
 */
export const modelIoTsStrictInterpreter = <Env extends AnyEnv>() =>
  merge(allModelBaseIoTs<Env>(), ioTsStrictObjectInterpreter<Env>())
