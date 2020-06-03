import { RecycleType, RecycleURI } from '../hkt';
import { recycleApplyConfig } from '../config';
import { memo } from '@morphic-ts/common/lib/utils';
import { recyclePrimitive } from '../recycle';
/**
 *  @since 0.0.1
 */
export const recycleUnknownInterpreter = memo(() => ({
    _F: RecycleURI,
    unknown: cfg => env => {
        const config = recycleApplyConfig(cfg);
        return new RecycleType(config(recyclePrimitive(), env)); // TODO: default to a better alternative
    }
}));
