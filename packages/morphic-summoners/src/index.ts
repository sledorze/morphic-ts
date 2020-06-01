import { AnyConfigEnv } from './summoner'
import { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'

export {
  /**
   *  @since 0.0.1
   */
  Summoners,
  /**
   *  @since 0.0.1
   */
  makeSummoner
} from './summoner'
export {
  /**
   *  @since 0.0.1
   */
  makeTagged
} from './tagged-union'
export {
  /**
   *  @since 0.0.1
   */
  interpretable
} from './programs-infer'
export {
  /**
   *  @since 0.0.1
   */

  ProgramType
} from './ProgramType'
export {
  /**
   *  @since 0.0.1
   */

  ProgramInterpreter,
  /**
   *  @since 0.0.1
   */
  Materialized
} from './materializer'

declare module './InterpreterResult' {
  interface InterpreterResult<E, A> {
    _: { build: (w: A) => A }
  }
}

declare module './ProgramType' {
  export interface ProgramAlgebra<F, Env> {
    _F: F
    Dummy: {}
  }
  export interface ProgramType<R extends AnyConfigEnv, E, A> {
    Dummy: {}
  }
  export interface ProgramAlgebraURI {
    Dummy: TaggedUnionsURI
  }
}
