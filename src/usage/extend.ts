import { Program, ProgramURI } from './programs-hkt'
import { ProgramInterpreter } from './materializer'
import { InterpreterURI, Interpreter } from './interpreters-hkt'
import { HKT2 } from '../HKT'
import { InterpreterAlgebra } from '../algebras/hkt'

export type ExtType<E extends Extension<any, any, any>> = E['ext']

export class Extension<
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  Ext extends Record<string, Program<any, any>[ProgURI]>
> {
  constructor(private int: ProgramInterpreter<ProgURI, InterpURI>, readonly ext: Ext) {}
  static fromInterp<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
    int: ProgramInterpreter<ProgURI, InterpURI>
  ): Extension<ProgURI, InterpURI, {}> {
    return new Extension(int, {})
  }
  extendedWith<
    O extends Record<string, { (...args: any[]): <G>(x: InterpreterAlgebra<G>[ProgURI] & Ext) => HKT2<G, any, any> }>
  >(o: O): Extension<ProgURI, InterpURI, Ext & O> {
    return new Extension(this.int, { ...this.ext, ...o })
  }
  get<OExt extends Ext>(): <E, A>(
    program: <G>(x: InterpreterAlgebra<G>[ProgURI] & OExt) => HKT2<G, E, A>
  ) => Interpreter<E, A>[InterpURI] {
    return (prog: any) => this.int((alg: any) => prog({ ...alg, ...this.ext }))
  }
}
