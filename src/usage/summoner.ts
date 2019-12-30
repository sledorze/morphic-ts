import { Program, ProgramTypes, ProgramURI } from './programs-hkt'
import { materialize, Materialized, ProgramInterpreter } from './materializer'
import { InterpreterURI } from './interpreters-hkt'
import { CacheType } from '../core'

export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  summonAs: <L, A>(F: Program<L, A>[ProgURI]) => Materialized<L, A, ProgURI, InterpURI>
  summonAsA: <A>() => <L>(F: Program<L, A>[ProgURI]) => Materialized<L, A, ProgURI, InterpURI>
  summonAsL: <L>() => <A>(F: Program<L, A>[ProgURI]) => Materialized<L, A, ProgURI, InterpURI>
  summon: <A>(F: Program<unknown, A>[ProgURI]) => Materialized<unknown, A, ProgURI, InterpURI>
}

// TODO: generalize to be able to extend several times, starting from just an Algebra
// Starting from base Algebra and building..

export function makeSummoner<
  ProgURI extends ProgramURI,
  InterpURI extends keyof ProgramTypes[ProgURI] & InterpreterURI
>(
  cacheProgramEval: CacheType,
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): ProgramTypes[ProgURI][InterpURI] {
  type P<L, A> = Program<L, A>[ProgURI]
  type M<L, A> = Materialized<L, A, ProgURI, InterpURI>
  type UM<A> = Materialized<unknown, A, ProgURI, InterpURI>

  const summonAs = <L, A>(F: P<L, A>): M<L, A> => materialize(cacheProgramEval(F), programInterpreter)

  const summonAsA: <A>() => <L>(F: P<L, A>) => M<L, A> = () => summonAs
  const summonAsL: <L>() => <A>(F: P<L, A>) => M<L, A> = () => summonAs
  const summon: <A>(F: P<unknown, A>) => UM<A> = summonAs

  return {
    summonAs,
    summonAsA,
    summonAsL,
    summon
  } as any
}
