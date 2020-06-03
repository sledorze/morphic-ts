import { RecycleType, RecycleURI } from '../hkt';
import { memo } from '@morphic-ts/common/lib/utils';
/**
 *  @since 0.0.1
 */
export const recycleRecursiveInterpreter = memo(() => ({
    _F: RecycleURI,
    recursive: a => {
        const get = memo(() => a(res));
        const res = env => {
            const getRecycle = memo(() => get()(env).recycle.recycle);
            return new RecycleType({ recycle: (prev, next) => getRecycle()(prev, next) });
        };
        return res;
    }
}));
