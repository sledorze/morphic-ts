import * as chai from 'chai'
import { summon } from '@morphic-ts/batteries/lib/summoner-T'
import { UUID } from 'io-ts-types/lib/UUID'
import { EqURI } from '@morphic-ts/eq-interpreters/lib/hkt'
import { eqString } from 'fp-ts/lib/Eq'
import { IoTsURI } from '../src/hkt'
import { ShowURI } from '@morphic-ts/show-interpreters/lib/hkt'
import { showString } from 'fp-ts/lib/Show'
import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'
import * as fc from 'fast-check'
import { isRight, right } from 'fp-ts/lib/Either'

const Custom = summon(F =>
  F.term<UUID, string>('UUID')({
    [EqURI]: {
      equals: eqString.equals
    },
    [IoTsURI]: UUID,
    [ShowURI]: {
      show: showString.show
    },
    [FastCheckURI]: fc.uuid() as fc.Arbitrary<UUID>
  })
)

describe('IO-TS Term Schema', () => {
  it('use custom term', () => {
    const result = Custom.type.decode('a288897c-f0ce-4506-9e7c-05727df0f2fe')

    chai.assert.deepStrictEqual(isRight(result), true)
    chai.assert.deepStrictEqual(result, right('a288897c-f0ce-4506-9e7c-05727df0f2fe'))
  })

  it('use custom term - arb', () => {
    fc.assert(fc.property(Custom.arb, x => x.length === 36))
  })
})
