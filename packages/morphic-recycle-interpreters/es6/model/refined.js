import { RecycleURI, RecycleType } from '../hkt';
import { recycleApplyConfig } from '../config';
import { memo } from '@morphic-ts/common/lib/utils';
/**
 *  @since 0.0.1
 */
export const recycleRefinedInterpreter = memo(() => ({
    _F: RecycleURI,
    refined: (getRecycle, _ref, _name, config) => env => new RecycleType(recycleApplyConfig(config)(getRecycle(env).recycle, env))
}));
