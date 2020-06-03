import type { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives';
import { RecycleURI } from '../hkt';
/**
 *  @since 0.0.1
 */
export declare const recyclePrimitiveInterpreter: <Env extends Partial<Record<"RecycleURI", any>>>() => ModelAlgebraPrimitive1<"RecycleURI", Env>;
