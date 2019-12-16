import { Program1URI, Program1, Program } from './programs-hkt'
import { materialize, ProgramInterpreter1, Materialized1, MaterializedU1 } from './materializer'
import { Interpreter1URI } from './interpreters-hkt'
import { CacheType } from '../core'

interface Summoners<ProgURI extends Program1URI, InterpURI extends Interpreter1URI> {
  summonAs: <L, A>(F: Program<L, A>[ProgURI]) => Materialized1<L, A, ProgURI, InterpURI>
  summonAsA: <A>() => <L>(F: Program<L, A>[ProgURI]) => Materialized1<L, A, ProgURI, InterpURI>
  summonAsL: <L>() => <A>(F: Program<L, A>[ProgURI]) => Materialized1<L, A, ProgURI, InterpURI>
  summon: <A>(F: Program<unknown, A>[ProgURI]) => Materialized1<unknown, A, ProgURI, InterpURI>
}
export type Summoned<ProgURI extends Program1URI, InterpURI extends Interpreter1URI, L, A> = Materialized1<
  L,
  A,
  ProgURI,
  InterpURI
>

export function makeSummoner<ProgURI extends Program1URI, InterpURI extends Interpreter1URI>(
  cacheProgramEval: CacheType,
  programInterpreter: ProgramInterpreter1<ProgURI, InterpURI>
): Summoners<ProgURI, InterpURI> {
  type P<L, A> = Program<L, A>[ProgURI]
  type P1<L, A> = Program1<L, A>[ProgURI]
  type M<L, A> = Materialized1<L, A, ProgURI, InterpURI>
  type UM<A> = MaterializedU1<A, ProgURI, InterpURI>

  const cached: <L, A>(x: P<L, A>) => P1<L, A> = cacheProgramEval as any

  const summonAs = <L, A>(F: P<L, A>): M<L, A> => materialize(cached(F), programInterpreter)

  const summonAsA: <A>() => <L>(F: P<L, A>) => M<L, A> = () => summonAs
  const summonAsL: <L>() => <A>(F: P<L, A>) => M<L, A> = () => summonAs
  const summon: <A>(F: P<unknown, A>) => UM<A> = summonAs

  return {
    summonAs,
    summonAsA,
    summonAsL,
    summon
  }
}
