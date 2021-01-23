import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { merge } from '@morphic-ts/common/lib/utils'

import { fastCheckIntersectionInterpreter } from './model/intersections'
import { fastCheckNewtypeInterpreter } from './model/newtype'
import { fastCheckObjectInterpreter } from './model/object'
import { fastCheckPrimitiveInterpreter } from './model/primitives'
import { fastCheckRecursiveInterpreter } from './model/recursive'
import { fastCheckRefinedInterpreter } from './model/refined'
import { fastCheckSetInterpreter } from './model/set'
import { fastCheckStrMapInterpreter } from './model/str-map'
import { fastCheckTaggedUnionInterpreter } from './model/tagged-unions'
import { fastCheckUnionInterpreter } from './model/unions'
import { fastCheckUnknownInterpreter } from './model/unknown'

export {} from './model/intersections'
export {} from './model/newtype'
export {} from './model/object'
export {} from './model/primitives'
export {} from './model/recursive'
export {} from './model/refined'
export {} from './model/set'
export {} from './model/str-map'
export {} from './model/tagged-unions'
export {} from './model/unions'
export {} from './model/unknown'

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
