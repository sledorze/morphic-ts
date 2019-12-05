import * as chai from 'chai'
import { summon } from '../../src/utils/summoner'
import { isRight } from 'fp-ts/lib/Either'
import { makeTagged } from '../../src/usage/tagged-union'

describe('tagged', () => {
  it('Should be used into another Morph', () => {
    const AType = summon(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summon)
    const Union = tagged('type')({ AType, BType })
    const Used = summon(F => F.interface({ x: Union(F) }, 'Used'))
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })
})
