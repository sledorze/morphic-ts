import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype';
import { RecycleURI } from '../hkt';
/**
 *  @since 0.0.1
 */
export declare const recycleNewtypeInterpreter: <Env extends Partial<Record<"RecycleURI", any>>>() => ModelAlgebraNewtype1<"RecycleURI", Env>;
