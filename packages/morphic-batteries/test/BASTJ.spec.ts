import * as chai from 'chai'
import { either, right as Eright } from 'fp-ts/Either'
import type { Type } from 'io-ts'
import { failure, success } from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { withValidate } from 'io-ts-types/lib/withValidate'

import { summonFor } from '../src/summoner-BASTJ'

const { summon } = summonFor<{}>({})

describe('BASTJ', () => {
  it('has non strict io-ts', () => {
    const A = summon(F => F.interface({ a: F.string(), b: F.string() }, { name: 'A' }))
    chai.assert.deepStrictEqual(A.type.decode({ a: 'a', b: 'b', c: 'c' }), Eright({ a: 'a', b: 'b', c: 'c' }))
    chai.assert.deepStrictEqual(A.type.encode({ a: 'a', b: 'b', c: 'c' } as any), {
      a: 'a',
      b: 'b',
      c: 'c'
    } as any)
  })
  it('has a strict io-ts', () => {
    const A = summon(F => F.interface({ a: F.string(), b: F.string() }, { name: 'A' }))
    chai.assert.deepStrictEqual(A.strictType.decode({ a: 'a', b: 'b', c: 'c' }), Eright({ a: 'a', b: 'b' }))
    chai.assert.deepStrictEqual(A.strictType.encode({ a: 'a', b: 'b', c: 'c' } as any), { a: 'a', b: 'b' })
  })
  it('has a create', () => {
    const StringLessThan = (max: number) => <O>(T: Type<string, O, unknown>) =>
      withValidate(T, (i, c) =>
        either.chain(T.validate(i, c), x =>
          x.length <= max ? success(x) : failure(x, c, `string too large (maximum ${max})`)
        )
      )

    const A = summon(F =>
      F.string({
        conf: {
          IoTsURI: StringLessThan(2)
        }
      })
    )
    chai.assert.deepStrictEqual(A.create('a'), Eright('a'))
    chai.assert.deepStrictEqual(PathReporter.report(A.create('aaaa')), ['string too large (maximum 2)'])
  })
})
