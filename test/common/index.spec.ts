import * as chai from 'chai'
import { assignFunction } from '../../src/common'

describe('assignFunction', () => {
  const fun = (a: string) => a.length
  const merged = assignFunction(fun, { x: 1, b: 'ZE' })

  it('can merge a unary function', () => {
    chai.assert.deepStrictEqual(merged('two'), 3)
  })

  it('does not pollute original function', () => {
    chai.assert.strictEqual('x' in merged, true)
    chai.assert.strictEqual('x' in fun, false)
  })

  it('can merge a binary function', () => {
    const fun2 = (a: string, b: string) => `${a}${b}`
    const merged2 = assignFunction(fun2, { x: 1, b: 'ZE' })
    chai.assert.deepStrictEqual(merged2('hello', 'World'), 'helloWorld')
  })

  it('can merge values', () => {
    chai.assert.deepStrictEqual(merged('two'), 3)
    chai.assert.deepStrictEqual(merged.x, 1)
    chai.assert.deepStrictEqual(merged.b, 'ZE')
  })
})
