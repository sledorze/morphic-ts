import { RecycleType, RecycleURI } from '../hkt';
import { projectFieldWithEnv, memo } from '@morphic-ts/common/lib/utils';
import { recycleApplyConfig } from '../config';
import { getStruct, getPartialStruct } from '../recycle';
const asPartial = (x) => x;
/**
 *  @since 0.0.1
 */
export const recycleObjectInterpreter = memo(() => ({
    _F: RecycleURI,
    interface: (props, _name, config) => env => new RecycleType(recycleApplyConfig(config)(getStruct(projectFieldWithEnv(props, env)('recycle')), env)),
    partial: (props, _name, config) => env => asPartial(new RecycleType(recycleApplyConfig(config)(getPartialStruct(projectFieldWithEnv(props, env)('recycle')), env)))
}));
