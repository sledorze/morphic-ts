import * as chai from 'chai'

const merge = <A, B, C>(ab: (a: A) => B, c: C): ((a: A) => B) & C => Object.assign({}, ab, c)

describe('Merger', () => {
  it('can merge a function', () => {
    const fun = (a: string) => a.length
    const merged = merge(fun, { x: 1, b: 'ZE' })

    chai.assert.strictEqual(merged('two'), 3)
    chai.assert.strictEqual(merged.x, 1)
    chai.assert.strictEqual(merged.b, 'ZE')
  })
})
