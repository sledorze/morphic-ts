import { InterpreterURIOfProgramInterpreter } from './materializer'
import { InterpreterURI, InterpreterResult } from './InterpreterResult'
import { HKT2 } from 'morphic-common/lib/HKT'
import { ProgramURI, ProgramType, ProgramAlgebra } from './ProgramType'

/**
 *  @since 0.0.1
 */
export type ExtType<E extends Extension<any, any>> = E['ext']

/**
 *  @since 0.0.1
 */
export class Extension<ProgURI extends ProgramURI, Ext extends Record<string, ProgramType<any, any>[ProgURI]>> {
  constructor(readonly ext: Ext) {}
  /**
   * Defines the base program type
   *  @since 0.0.1
   */
  static of<ProgURI extends ProgramURI>(_p: ProgURI): Extension<ProgURI, {}> {
    return new Extension<ProgURI, {}>({})
  }
  /**
   * Extends the current algebra with new definitions
   *  @since 0.0.1
   */
  with<O extends Record<string, { (...args: any[]): <G>(x: ProgramAlgebra<G>[ProgURI] & Ext) => HKT2<G, any, any> }>>(
    o: O
  ): Extension<ProgURI, Ext & O> {
    return new Extension({ ...this.ext, ...o })
  }
  /**
   * Convenience method to opacity Extension as a nominal type in order to reduce inference noise
   *  @since 0.0.1
   */
  asType<OExt extends Ext>(): Extension<ProgURI, OExt> {
    return (this as any) as Extension<ProgURI, OExt>
  }
  /**
   * Returns an interpreter extended with this new albegra
   *  @since 0.0.1
   */

  interpretedBy<Interp extends <E, A>(program: ProgramType<E, A>[ProgURI]) => InterpreterResult<E, A>[InterpreterURI]>(
    int: Interp
  ): <E, A>(
    program: <G>(x: ProgramAlgebra<G>[ProgURI] & Ext) => HKT2<G, E, A>
  ) => InterpreterResult<E, A>[InterpreterURIOfProgramInterpreter<typeof int>] {
    return (prog: any) => int((alg: any) => prog({ ...alg, ...this.ext })) as any
  }
}
