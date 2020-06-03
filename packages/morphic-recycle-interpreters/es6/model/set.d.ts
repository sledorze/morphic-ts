import type { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set';
import { RecycleURI } from '../hkt';
/**
 *  @since 0.0.1
 */
export declare const recycleSetInterpreter: <Env extends Partial<Record<"RecycleURI", any>>>() => ModelAlgebraSet1<"RecycleURI", Env>;
