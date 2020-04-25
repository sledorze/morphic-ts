import * as chai from 'chai'
import * as E from 'fp-ts/lib/Either'
import { summonFor } from '../src/summoner-BASTJ'
import { withValidate } from 'io-ts-types/lib/withValidate'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { failure, success, Type } from 'io-ts'

const { summon } = summonFor<{}>({})

describe('BASTJ', () => {
  it('has non strict io-ts', () => {
    const A = summon(F => F.interface({ a: F.string(), b: F.string() }, 'A'))
    chai.assert.deepStrictEqual(A.type.decode({ a: 'a', b: 'b', c: 'c' }), E.right({ a: 'a', b: 'b', c: 'c' }))
    chai.assert.deepStrictEqual(A.type.encode({ a: 'a', b: 'b', c: 'c' } as any), {
      a: 'a',
      b: 'b',
      c: 'c'
    } as any)
  })
  it('has a strict io-ts', () => {
    const A = summon(F => F.interface({ a: F.string(), b: F.string() }, 'A'))
    chai.assert.deepStrictEqual(A.strictType.decode({ a: 'a', b: 'b', c: 'c' }), E.right({ a: 'a', b: 'b' }))
    chai.assert.deepStrictEqual(A.strictType.encode({ a: 'a', b: 'b', c: 'c' } as any), { a: 'a', b: 'b' })
  })
  it('has a create', () => {
    const StringLessThan = (max: number) => <O>(T: Type<string, O, unknown>) =>
      withValidate(T, (i, c) =>
        E.either.chain(T.validate(i, c), x =>
          x.length <= max ? success(x) : failure(x, c, `string too large (maximum ${max})`)
        )
      )

    const A = summon(F =>
      F.string({
        IoTsURI: StringLessThan(2)
      })
    )
    chai.assert.deepStrictEqual(A.create('a'), E.right('a'))
    chai.assert.deepStrictEqual(PathReporter.report(A.create('aaaa')), ['string too large (maximum 2)'])
  })
})
