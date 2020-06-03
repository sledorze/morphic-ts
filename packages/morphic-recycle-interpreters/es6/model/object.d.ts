import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object';
import { RecycleURI } from '../hkt';
/**
 *  @since 0.0.1
 */
export declare const recycleObjectInterpreter: <Env extends Partial<Record<"RecycleURI", any>>>() => ModelAlgebraObject1<"RecycleURI", Env>;
