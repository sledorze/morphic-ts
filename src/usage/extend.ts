import { Program, ProgramURI } from './programs-hkt'
import { ProgramInterpreter } from './materializer'
import { InterpreterURI, Interpreter } from './interpreters-hkt'
import { HKT2 } from '../HKT'
import { InterpreterAlgebra } from '../algebras/hkt'

export type ExtType<E extends Extension<any, any>> = E['ext']

export class Extension<ProgURI extends ProgramURI, Ext extends Record<string, Program<any, any>[ProgURI]>> {
  constructor(readonly ext: Ext) {}
  /**
   * Defines the base program type
   */
  static of<ProgURI extends ProgramURI>(p: ProgURI): Extension<ProgURI, {}> {
    return new Extension({})
  }
  /**
   * Extends the current algebra with new definitions
   */
  with<
    O extends Record<string, { (...args: any[]): <G>(x: InterpreterAlgebra<G>[ProgURI] & Ext) => HKT2<G, any, any> }>
  >(o: O): Extension<ProgURI, Ext & O> {
    return new Extension({ ...this.ext, ...o })
  }
  /**
   * Convenience method to opacity Extension as a nominal type in order to reduce inference noise
   */
  asType<OExt extends Ext>(): Extension<ProgURI, OExt> {
    return (this as any) as Extension<ProgURI, OExt>
  }
  /**
   * Returns an interpreter extended with this new albegra
   */
  interpretedBy<InterpURI extends InterpreterURI>(
    int: ProgramInterpreter<ProgURI, InterpURI>
  ): <E, A>(program: <G>(x: InterpreterAlgebra<G>[ProgURI] & Ext) => HKT2<G, E, A>) => Interpreter<E, A>[InterpURI] {
    return (prog: any) => int((alg: any) => prog({ ...alg, ...this.ext }))
  }
}
