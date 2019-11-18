import * as chai from 'chai'
import { summon } from '../../src/utils/summoner'
import { isRight } from 'fp-ts/lib/Either'
import { makeTagged } from '../../src/usage/tagged-union'

describe('Usage', () => {
  it('Should reexpose `program` in order to make the Morph usable', () => {
    const AType = summon(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summon)
    const Union = tagged('type')({ AType, BType })
    const Used = summon(F => F.interface({ x: Union.program(F) }, 'Used'))
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })
})
