import * as chai from 'chai'
import { summon, M } from '../../src/batteries/summoner'
import { isRight } from 'fp-ts/lib/Either'
import { makeTagged, makeTagged2 } from '../../src/usage/tagged-union'

describe('tagged', () => {
  it('Should be used into another Morph', () => {
    const AType = summon(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged2(summon)
    const Union = tagged('type')({ AType, BType })
    const Used = summon(F => F.interface({ x: Union(F) }, 'Used'))
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })

  it('Should infer E in addition of A when be used into another Morph', () => {
    const AType = summon(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summon)
    const Union = tagged('type')({ AType, BType })
    const Used = summon(F => F.interface({ x: Union(F) }, 'Used'))
    const v = Used.build({ x: { type: 'AType' } })
    const x: { x: { type: string } } = Used.type.encode(v) // Would error if Output type not inferred correctly
    chai.assert.deepStrictEqual(x, v)
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })

  it('Can constraint A type param', () => {
    const CType = summon(F => F.interface({ tag: F.stringLiteral('CType') }, 'CType'))
    const Action = <E, P>(_p: M<E, P & { type?: never }>): void => undefined
    Action(CType) // Should not become red
  })
})
