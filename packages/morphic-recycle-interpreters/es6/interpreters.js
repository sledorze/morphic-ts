import { merge, memo } from '@morphic-ts/common/lib/utils';
import { recycleRefinedInterpreter } from './model/refined';
import { recycleNewtypeInterpreter } from './model/newtype';
import { recycleUnknownInterpreter } from './model/unknown';
import { recyclePrimitiveInterpreter } from './model/primitives';
import { recycleIntersectionInterpreter } from './model/intersections';
import { recycleObjectInterpreter } from './model/object';
import { recycleTaggedUnionInterpreter } from './model/tagged-unions';
import { recycleRecursiveInterpreter } from './model/recursive';
import { recycleStrMapInterpreter } from './model/str-map';
import { recycleSetInterpreter } from './model/set';
export * from './hkt';
/**
 *  @since 0.0.1
 */
const allModelRecycle = () => merge(recycleRefinedInterpreter(), recycleNewtypeInterpreter(), recycleUnknownInterpreter(), recyclePrimitiveInterpreter(), recycleIntersectionInterpreter(), recycleObjectInterpreter(), recycleTaggedUnionInterpreter(), recycleRecursiveInterpreter(), recycleStrMapInterpreter(), recycleSetInterpreter());
/**
 *  @since 0.0.1
 */
export const modelRecycleInterpreter = memo(allModelRecycle);
