import type { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'
import { defineFor } from '@morphic-ts/summoners'
import * as fc from 'fast-check'
import { isRight } from 'fp-ts/Either'

import { ProgramUnionURI } from '../src/program'
import { summonFor } from '../src/summoner-BASTJ'

interface FastCheck {
  fc: typeof fc
}

interface AppEnv {
  [FastCheckURI]: FastCheck
}

describe('defineFor', () => {
  const { summon } = summonFor<AppEnv>({
    FastCheckURI: {
      fc
    }
  })

  const model = defineFor(ProgramUnionURI)<{ FastCheckURI: FastCheck }>()(F =>
    F.string({ FastCheckURI: (_, env) => env.fc.string({ minLength: 2, maxLength: 4 }) })
  )

  it('can be reinterpreted by a summoner', () => {
    const morph = summon(model)
    fc.assert(fc.property(morph.arb, x => x.length >= 2 && x.length <= 4))
    fc.assert(fc.property(morph.arb, x => isRight(morph.type.decode(x))))
  })
})

describe('define', () => {
  const { define, summon } = summonFor<AppEnv>({
    FastCheckURI: {
      fc
    }
  })

  const model = define(F =>
    F.string({ FastCheckURI: (_, env: FastCheck) => env.fc.string({ minLength: 2, maxLength: 4 }) }))

  it('can be reinterpreted by a summoner', () => {
    const morph = summon(model)
    fc.assert(fc.property(morph.arb, x => x.length >= 2 && x.length <= 4))
    fc.assert(fc.property(morph.arb, x => isRight(morph.type.decode(x))))
  })
})
