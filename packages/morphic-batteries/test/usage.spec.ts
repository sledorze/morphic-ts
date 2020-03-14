import * as chai from 'chai'
import { summon, M } from '../src/summoner-ESBASTJ'
import { isRight } from 'fp-ts/lib/Either'
import { makeTagged } from '../src/usage/tagged-union'

describe('tagged', () => {
  it('Should be used into another Morph', () => {
    const AType = summon(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summon)
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

  it('Should infer E in addition of A when be used into another Morph', () => {
    interface AType {
      type: 'AType'
    }
    interface BType {
      type: 'BType'
    }
    interface CType {
      type: 'CType'
    }
    interface ARawType {
      type: string
    }
    interface BRawType {
      type: string
    }
    interface CRawType {
      type: string
    }
    const AType = summon<ARawType, AType>(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summon<BRawType, BType>(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const CType = summon<CRawType, CType>(F => F.interface({ type: F.stringLiteral('CType') }, 'CType'))

    const a = AType.build({ type: 'AType' })
    const b = BType.build({ type: 'BType' })
    const c = CType.build({ type: 'CType' })

    const tagged = makeTagged(summon)

    const UnionABC = tagged('type')({ AType, BType, CType })

    chai.assert.deepStrictEqual(UnionABC.type.is(a), true)
    chai.assert.deepStrictEqual(UnionABC.type.is(b), true)
    chai.assert.deepStrictEqual(UnionABC.type.is(c), true)

    const UnionAB = UnionABC.selectMorph(['AType', 'BType'])

    chai.assert.deepStrictEqual(UnionAB.type.is(a), true)
    chai.assert.deepStrictEqual(UnionAB.type.is(b), true)
    chai.assert.deepStrictEqual(UnionAB.type.is(c), false)

    const UnionBC = UnionABC.excludeMorph(['AType'])

    chai.assert.deepStrictEqual(UnionBC.type.is(a), false)
    chai.assert.deepStrictEqual(UnionBC.type.is(b), true)
    chai.assert.deepStrictEqual(UnionBC.type.is(c), true)
  })
})
