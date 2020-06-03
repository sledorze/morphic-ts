import { RecycleType, RecycleURI } from '../hkt';
import { memo } from '@morphic-ts/common/lib/utils';
import { getSet } from '../recycle';
/**
 *  @since 0.0.1
 */
export const recycleSetInterpreter = memo(() => ({
    _F: RecycleURI,
    set: getRecycle => env => new RecycleType(getSet(getRecycle(env).recycle))
}));
