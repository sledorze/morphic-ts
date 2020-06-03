import type { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections';
import { RecycleURI } from '../hkt';
/**
 * Recycles an intersection
 *
 * @since 0.0.1
 */
export declare const recycleIntersectionInterpreter: <Env extends Partial<Record<"RecycleURI", any>>>() => ModelAlgebraIntersection1<"RecycleURI", Env>;
