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
import type { AnyEnv } from '@morphic-ts/common/lib/config'

import type { ModelAlgebraObject2 } from '@morphic-ts/model-algebras/lib/object'
import type { ModelAlgebraRefined2 } from '@morphic-ts/model-algebras/lib/refined'
import type { ModelAlgebraNewtype2 } from '@morphic-ts/model-algebras/lib/newtype'
import type { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import type { ModelAlgebraPrimitive2 } from '@morphic-ts/model-algebras/lib/primitives'
import type { ModelAlgebraIntersection2 } from '@morphic-ts/model-algebras/lib/intersections'
import type { ModelAlgebraUnions2 } from '@morphic-ts/model-algebras/lib/unions'
import type { ModelAlgebraTaggedUnions2 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import type { ModelAlgebraSet2 } from '@morphic-ts/model-algebras/lib/set'
import type { ModelAlgebraRecursive2 } from '@morphic-ts/model-algebras/lib/recursive'
import { IoTsURI } from './hkt'

export * from './hkt'

export interface IoTsAlgebra<Env extends AnyEnv>
  extends ModelAlgebraObject2<IoTsURI, Env>,
    ModelAlgebraRefined2<IoTsURI, Env>,
    ModelAlgebraNewtype2<IoTsURI, Env>,
    ModelAlgebraUnknown2<IoTsURI, Env>,
    ModelAlgebraPrimitive2<IoTsURI, Env>,
    ModelAlgebraIntersection2<IoTsURI, Env>,
    ModelAlgebraUnions2<IoTsURI, Env>,
    ModelAlgebraTaggedUnions2<IoTsURI, Env>,
    ModelAlgebraStrMap2<IoTsURI, Env>,
    ModelAlgebraSet2<IoTsURI, Env>,
    ModelAlgebraRecursive2<IoTsURI, Env> {}

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
export const modelIoTsNonStrictInterpreter = <Env extends AnyEnv>(): IoTsAlgebra<Env> =>
  merge(allModelBaseIoTs<Env>(), ioTsNonStrictObjectInterpreter<Env>())

/**
 *  @since 0.0.1
 */
export const modelIoTsStrictInterpreter = <Env extends AnyEnv>(): IoTsAlgebra<Env> =>
  merge(allModelBaseIoTs<Env>(), ioTsStrictObjectInterpreter<Env>())
