import * as t from 'io-ts'
import { defineFor } from '../../src/programs-infer'
import type { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'
import { summonFor, ProgramUnionURI } from './summoner'

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
    { a: F.string({ conf: { FastCheckURI: (x, e: FastCheck & { a: string }) => x } }), b: F.string() },
    { name: 'A' }
  )
  return res
})

summon(F => {
  const res = F.interface(
    {
      a: F.string({
        conf: {
          FastCheckURI: (x, e) => {
            // $ExpectType Env["FastCheckURI"]
            e
            return x
          }
        }
      }),
      b: F.string()
    },
    { name: 'A' }
  )
  return res
})

// $ExpectType M<{ FastCheckURI: FastCheck; }, Array<string>, Array<string>>
summon(F =>
  F.array(
    F.string({
      conf: {
        FastCheckURI: (x, { fc }) => {
          // $ExpecetType string
          fc
          return x
        }
      }
    })
  )
)

// $ExpectError
summon(F => F.array(F.string({ conf: { IoTsURI: (x, e: { t: typeof t }) => x } })))

// $ExpectType P<{ FastCheckURI: { x: string; }; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: { x: string } }>()(F =>
  // $ExpectError
  F.string({ conf: { FastCheckURI: (_, env: FastCheck) => _ } })
)

// $ExpectType P<{ FastCheckURI: FastCheck; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({
    conf: {
      FastCheckURI: (_, env) => {
        // $ExpectType Env["FastCheckURI"]
        env
        return _
      }
    }
  })
)

// $ExpectType P<{}, string, string>
defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.string({ conf: { FastCheckURI: (_, env: FastCheck) => _ } })
)

// $ExpectType P<{ FastCheckURI: FastCheck; }, string, string>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({ conf: { FastCheckURI: (_, env: FastCheck) => _ } })
)

// $ExpeectType P<{ FastCheckURI: FastCheck; }, string, string>
const model = defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.string({ conf: { FastCheckURI: (_, _env) => _ } })
)

// $ExpectError
defineFor(ProgramUnionURI)<{}>()(F => F.interface({ a: model(F), b: F.number() }, { name: 'A' }))

// $ExpectType P<{ FastCheckURI: FastCheck; }, Readonly<{ a: string; b: number; }>, Readonly<{ a: string; b: number; }>>
defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
  F.interface({ a: model(F), b: F.number() }, { name: 'A' })
)

defineFor(ProgramUnionURI)()(F =>
  // $ExpectError
  F.interface({ a: model(F) }, { name: 'A' })
)

defineFor(ProgramUnionURI)()(F =>
  // $ExpectError
  F.interface({ b: F.number({ conf: { FastCheckURI: (_, env: FastCheck2) => _ } }) }, { name: 'A' })
)

defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.interface({ b: F.number({ conf: { FastCheckURI: (_, env: FastCheck2) => _ } }) }, { name: 'A' })
)

defineFor(ProgramUnionURI)<{}>()(F =>
  // $ExpectError
  F.interface({ b: F.number({ conf: { FastCheckURI: (_, env: FastCheck2) => _ } }) }, { name: 'A' })
)

// $ExpectType P<{ FastCheckURI: FastCheck & FastCheck2; }, Readonly<{ a: string; b: number; }>, Readonly<{ a: string; b: number; }>>
const prg = defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck & FastCheck2 }>()(F =>
  F.interface({ a: model(F), b: F.number({ conf: { FastCheckURI: (_, env: FastCheck2) => _ } }) }, { name: 'A' })
)

// $ExpectError
summon(prg)

const { summon: summonAppEnv } = summonFor<AppEnv>({ FastCheckURI: { fc: 'a', fc2: 'a' } })

// $ExpectType M<AppEnv, Readonly<{ a: string; b: number; }>, Readonly<{ a: string; b: number; }>>
summonAppEnv(prg)
