import { merge } from '@morphic-ts/common/lib/utils'
import { fastCheckRefinedInterpreter } from './model/refined'
import { fastCheckNewtypeInterpreter } from './model/newtype'
import { fastCheckUnknownInterpreter } from './model/unknown'
import { fastCheckPrimitiveInterpreter } from './model/primitives'
import { fastCheckIntersectionInterpreter } from './model/intersections'
import { fastCheckObjectInterpreter } from './model/object'
import { fastCheckUnionInterpreter } from './model/unions'
import { fastCheckTaggedUnionInterpreter } from './model/tagged-unions'
import { fastCheckRecursiveInterpreter } from './model/recursive'
import { fastCheckStrMapInterpreter } from './model/str-map'
import { fastCheckSetInterpreter } from './model/set'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelFastCheck = <Env extends AnyEnv>() =>
  merge(
    fastCheckRefinedInterpreter<Env>(),
    fastCheckNewtypeInterpreter<Env>(),
    fastCheckUnknownInterpreter<Env>(),
    fastCheckPrimitiveInterpreter<Env>(),
    fastCheckIntersectionInterpreter<Env>(),
    fastCheckObjectInterpreter<Env>(),
    fastCheckUnionInterpreter<Env>(),
    fastCheckTaggedUnionInterpreter<Env>(),
    fastCheckRecursiveInterpreter<Env>(),
    fastCheckStrMapInterpreter<Env>(),
    fastCheckSetInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelFastCheckInterpreter = allModelFastCheck
