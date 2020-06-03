import { RecycleURI, RecycleType } from '../hkt';
import { recycleApplyConfig } from '../config';
import { memo } from '@morphic-ts/common/lib/utils';
/**
 *  @since 0.0.1
 */
export const recycleNewtypeInterpreter = memo(() => ({
    _F: RecycleURI,
    newtype: () => (getRecycle, config) => env => new RecycleType(recycleApplyConfig(config)(getRecycle(env).recycle, env))
}));
