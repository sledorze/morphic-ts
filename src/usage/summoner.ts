import { ProgramsURI, Program } from './programs-hkt'
import { materialize, ProgramInterpreter, Materialized, Materialized_ } from './materializer'
import { InterpretersURI } from './interpreters-hkt'
import { CacheType } from '../core'

export function makeSummoner<ProgURI extends ProgramsURI, InterpURI extends InterpretersURI>(
  cacheProgramEval: CacheType,
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
) {
  type P<L, A> = Program<L, A>[ProgURI]
  type M<L, A> = Materialized<L, A, ProgURI, InterpURI>
  type M_<A> = Materialized_<A, ProgURI, InterpURI>

  const summonAs = <L, A>(F: P<L, A>): M<L, A> => materialize(cacheProgramEval(F), programInterpreter)

  const summonAsA: <A>() => <L>(F: P<L, A>) => M<L, A> = () => summonAs
  const summonAsL: <L>() => <A>(F: P<L, A>) => M<L, A> = () => summonAs
  const summon: <A>(F: P<unknown, A>) => M_<A> = summonAs
  return {
    summonAs,
    summonAsA,
    summonAsL,
    summon
  }
}
