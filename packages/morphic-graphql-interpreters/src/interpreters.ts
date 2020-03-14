import { merge } from '@morphic-ts/common/lib/utils'
// import { graphqlRefinedInterpreter } from './model/refined'
// import { graphqlNewtypeInterpreter } from './model/newtype'
// import { graphqlUnknownInterpreter } from './model/unknown'
import { graphqlPrimitiveInterpreter } from './model/primitives'
// import { graphqlIntersectionInterpreter } from './model/intersections'
import { graphqlObjectInterpreter } from './model/object'
// import { graphqlTaggedUnionInterpreter } from './model/tagged-unions'
// import { graphqlRecursiveInterpreter } from './model/recursive'
// import { graphqlStrMapInterpreter } from './model/str-map'
// import { graphqlSetInterpreter } from './model/set'
// import { graphqlTermInterpreter } from './model/term'
export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelGraphql = merge(
  //  graphqlRefinedInterpreter,
  //  graphqlNewtypeInterpreter,
  //  graphqlUnknownInterpreter,
  graphqlPrimitiveInterpreter,
  //  graphqlIntersectionInterpreter,
  graphqlObjectInterpreter
  //  graphqlTaggedUnionInterpreter,
  //  graphqlRecursiveInterpreter,
  //  graphqlStrMapInterpreter,
  //  graphqlSetInterpreter,
  //  graphqlTermInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelGraphqlInterpreter = allModelGraphql
