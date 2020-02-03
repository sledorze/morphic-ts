import * as chai from 'chai'
import { Extension, ExtType } from '../src/usage/extend'
import { BASTJInterpreter } from '../src/interpreters-BAST'
import { either } from 'fp-ts'
import { ProgramUnionURI } from '../src/program'

describe('extend', () => {
  const extension = Extension.of(ProgramUnionURI)
    .with({
      Person: <K extends string>(name: K) => F =>
        F.interface({ name: F.string(), age: F.number(), tag: F.stringLiteral(name) }, 'Person')
    })
    .with({
      PersonGroup: () => F => F.array(F.Person('a')(F))
    })

  interface Ext extends ExtType<typeof extension> {}
  const extended = extension.asType<Ext>().interpretedBy(BASTJInterpreter)

  it('give the ability to define a new extension and use base algebra', () => {
    const x = extended(F => F.array(F.string()))
    chai.assert.strictEqual(either.isRight(x.type.decode(x.type.encode(x.build(['a', 'b'])))), true)
  })

  it('give the ability to define a new extension and use it', () => {
    const x = extended(F => F.array(F.Person('b')(F)))
    chai.assert.strictEqual(
      either.isRight(x.type.decode(x.type.encode(x.build([{ name: 'georges', age: 42, tag: 'b' }])))),
      true
    )
  })

  it('give the ability to define a new extension based on another extension', () => {
    const x = extended(F => F.array(F.PersonGroup()(F)))
    chai.assert.strictEqual(
      either.isRight(x.type.decode(x.type.encode(x.build([[{ name: 'georges', age: 42, tag: 'a' }]])))),
      true
    )
  })
})
