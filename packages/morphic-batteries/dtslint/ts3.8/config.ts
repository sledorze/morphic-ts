import { summonFor } from '../../src/summoner-BASTJ'
import { fastCheckConfig } from '@morphic-ts/fastcheck-interpreters/lib/config'
import { iotsConfig } from '@morphic-ts/io-ts-interpreters/lib/config'
import * as t from 'io-ts'
import { defineFor } from '../../src/usage/programs-infer'
import { ProgramUnionURI } from '../../src/program'
import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'

interface FastCheck {}
interface FastCheck2 {}

interface AppEnv {
  [FastCheckURI]: FastCheck & FastCheck2
}

const { summon } = summonFor<{}>({})

// tslint:disable-next-line: max-line-length
// $ExpectType ["summon env error, got ", {}, " but requires ", { FastCheckURI: FastCheck; }, " please provide dependencies"]
summon(F => {
  // $ExpectType HKT2<G, { FastCheckURI: FastCheck; }, { a: string; b: string; }, { a: string; b: string; }>
  const res = F.interface({ a: F.stringCfg({ ...fastCheckConfig((x, e: FastCheck) => x) }), b: F.string }, 'A')
  return res
})

// $ExpectType ["summon env error, got ", {}, " but requires ", { FastCheckURI: { fc: FastCheck; }; }, " please provide dependencies"]
summon(F => F.array(F.stringCfg({ ...fastCheckConfig((x, e: { fc: FastCheck }) => x) })))

// tslint:disable-next-line: max-line-length
// $ExpectType ["summon env error, got ", {}, " but requires ", { IoTsURI: { t: typeof import("/Users/sledorze/projects/morphic-ts/node_modules/io-ts/lib/index"); }; }, " please provide dependencies"]
summon(F => F.array(F.stringCfg({ ...iotsConfig((x, e: { t: typeof t }) => x) })))

// $ExpectType P<{ FastCheckURI: FastCheck; }, string, string>
const model = defineFor(ProgramUnionURI)(F => F.stringCfg({ ...fastCheckConfig((_, env: FastCheck) => _) }))

// $ExpectType P<{ FastCheckURI: FastCheck; }, { a: string; b: number; }, { a: string; b: number; }>
defineFor(ProgramUnionURI)(F => F.interface({ a: model(F), b: F.number }, 'A'))

// $ExpectType P<{ FastCheckURI: FastCheck; } & { FastCheckURI: FastCheck2; }, { a: string; b: number; }, { a: string; b: number; }>
const prg = defineFor(ProgramUnionURI)(F =>
  F.interface({ a: model(F), b: F.numberCfg({ ...fastCheckConfig((_, env: FastCheck2) => _) }) }, 'A')
)

// $ExpectType ["summon env error, got ", {}, " but requires ", { FastCheckURI: FastCheck; } & { FastCheckURI: FastCheck2; }, " please provide dependencies"]
summon(prg)

const { summon: summonAppEnv } = summonFor<AppEnv>({ FastCheckURI: {} })

// $ExpectType M<AppEnv, { a: string; b: number; }, { a: string; b: number; }>
summonAppEnv(prg)
