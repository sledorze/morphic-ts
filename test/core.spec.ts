import * as chai from 'chai'
import { cacheUnaryFunction } from '../src/core'

describe.only('cacheUnaryFunction', () => {
  const inc = (x: number) => x + 1
  const incRef = ({ x }: { x: number }) => ({
    x: x + 1
  })
  const inc2Ref = ({ x }: { x: number }) => ({
    x: x + 2
  })

  it('return function application', () => {
    const cachedInc = cacheUnaryFunction(inc)

    chai.assert.deepStrictEqual(cachedInc(1), 2)
    chai.assert.deepStrictEqual(cachedInc(2), 3)
  })

  it('can dispatch to the right function when applied with same value', () => {
    const cachedInc = cacheUnaryFunction(incRef)
    const cachedInc2 = cacheUnaryFunction(inc2Ref)
    const params1 = { x: 1 }

    chai.assert.deepStrictEqual(cachedInc(params1), { x: 2 })
    chai.assert.deepStrictEqual(cachedInc2(params1), { x: 3 })
  })

  it('returns the same value for the same parameters instance (not structurally equal)', () => {
    const cachedInc = cacheUnaryFunction(incRef)

    const params1 = { x: 1 }
    const params1bis = { x: 1 }

    const params1Res1 = cachedInc(params1)
    const params1Res2 = cachedInc(params1)
    const params1bisRes1 = cachedInc(params1bis)

    chai.assert.strictEqual(params1Res1, params1Res2)
    chai.assert.notStrictEqual(params1Res1, params1bisRes1)
  })

  it('is isolated', () => {
    const cachedInc1 = cacheUnaryFunction(incRef)
    const cachedInc2 = cacheUnaryFunction(incRef)

    chai.assert.notStrictEqual(cachedInc1({ x: 1 }), cachedInc2({ x: 1 }))
  })
})
