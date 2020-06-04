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
  makeSummoner,
  /**
   *  @since 0.0.1
   */
  AnyConfigEnv,
  /**
   *  @since 0.0.1
   */
  ExtractEnv,
  /**
   *  @since 0.0.1
   */
  SummonerOps
} from './summoner'
export {
  /**
   *  @since 0.0.1
   */
  makeTagged,
  /**
   *  @since 0.0.1
   */
  AOfMorhpADT,
  /**
   *  @since 0.0.1
   */
  EOfMorhpADT
} from './tagged-union'
export {
  /**
   *  @since 0.0.1
   */
  interpretable,
  /**
   *  @since 0.0.1
   */
  defineFor,
  /**
   *  @since 0.0.1
   */
  InferredAlgebra,
  /**
   *  @since 0.0.1
   */
  InferredProgram
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

export {
  /**
   *  @since 0.0.1
   */

  AType,
  /**
   *  @since 0.0.1
   */
  EType
} from './utils'

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
