import { summonFor } from '../../src/summoner-BASTJ'
import { fastCheckConfig } from '@morphic-ts/fastcheck-interpreters/lib/config'
import { iotsConfig } from '@morphic-ts/io-ts-interpreters/lib/config'
import * as t from 'io-ts'
import { defineFor } from '../../src/usage/programs-infer'
import { ProgramUnionURI } from '../../src/program'
import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'

interface FastCheck {
  fc: string
}
interface FastCheck2 {
  fc2: string
}

interface AppEnv {
  [FastCheckURI]: FastCheck & FastCheck2
}

const { summon } = summonFor<{ FastCheckURI: FastCheck }>({ FastCheckURI: { fc: 'z' } })

summon(F => {
  const res = F.interface(
    // $ExpectError
    { a: F.string({ ...fastCheckConfig((x, e: FastCheck & { a: string }) => x) }), b: F.string() },
    'A'
  )
  return res
})

summon(F => {
  const res = F.interface(
    {
      a: F.string({
        ...fastCheckConfig((x, e) => {
          // $ExpectType Env["FastCheckURI"]
          e
          return x
        })
      }),
      b: F.string()
    },
    'A'
  )
  return res
})

// $ExpectType M<{ FastCheckURI: FastCheck; }, string[], string[]>
summon(F =>
  F.array(
    F.string({
      ...fastCheckConfig((x, { fc }) => {
        // $ExpecetType string
        fc
        return x
      })
    })
  )
)

// $ExpectError
summon(F => F.array(F.string(, { ...iotsConfig((x, e: { t: typeof t }) => x) })))

// $ExpectType P<{ FastCheckURI: { x: string; }; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: { x: string } }>()(F =>
  // $ExpectError
  F.string({ ...fastCheckConfig((_, env: FastCheck) => _) })
)

// $ExpectType P<{ FastCheckURI: FastCheck; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({
    ...fastCheckConfig((_, env) => {
      // $ExpectType Env["FastCheckURI"]
      env
      return _
    })
  })
)

// $ExpectType P<{}, string, string>
defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.string({ ...fastCheckConfig((_, env: FastCheck) => _) })
)

// $ExpectType P<{ FastCheckURI: FastCheck; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({ ...fastCheckConfig((_, env: FastCheck) => _) })
)

// $ExpeectType P<{ FastCheckURI: FastCheck; }, string, string>
const model = defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({ ...fastCheckConfig((_, _env) => _) })
)

// $ExpectError
defineFor(ProgramUnionURI)<{}>()(F => F.interface({ a: model(F), b: F.number() }, 'A'))

// $ExpectType P<{ FastCheckURI: FastCheck; }, { a: string; b: number; }, { a: string; b: number; }>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F => F.interface({ a: model(F), b: F.number() }, 'A'))

defineFor(ProgramUnionURI)()(F =>
  // $ExpectError
  F.interface({ a: model(F) }, 'A')
)

defineFor(ProgramUnionURI)()(F =>
  // $ExpectError
  F.interface({ b: F.number({ ...fastCheckConfig((_, env: FastCheck2) => _) }) }, 'A')
)

defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.interface({ b: F.number({ ...fastCheckConfig((_, env: FastCheck2) => _) }) }, 'A')
)

defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.interface({ b: F.number({ ...fastCheckConfig((_, env: FastCheck2) => _) }) }, 'A')
)

// $ExpectType P<{ FastCheckURI: FastCheck & FastCheck2; }, { a: string; b: number; }, { a: string; b: number; }>
const prg = defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck & FastCheck2 }>()(F =>
  F.interface({ a: model(F), b: F.number({ ...fastCheckConfig((_, env: FastCheck2) => _) }) }, 'A')
)

// $ExpectError
summon(prg)

const { summon: summonAppEnv } = summonFor<AppEnv>({ FastCheckURI: { fc: 'a', fc2: 'a' } })

// $ExpectType M<AppEnv, { a: string; b: number; }, { a: string; b: number; }>
summonAppEnv(prg)
