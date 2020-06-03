import { RecycleType, RecycleURI } from '../hkt';
import { recycleApplyConfig } from '../config';
import { memo } from '@morphic-ts/common/lib/utils';
import { getStrMap } from '../recycle';
/**
 *  @since 0.0.1
 */
export const recycleStrMapInterpreter = memo(() => ({
    _F: RecycleURI,
    strMap: (getCodomain, config) => env => new RecycleType(recycleApplyConfig(config)(getStrMap(getCodomain(env).recycle), env))
}));
