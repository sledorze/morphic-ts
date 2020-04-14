import * as fc from 'fast-check'
import { ordString, ord } from 'fp-ts/lib/Ord'
import { ProgramUnionURI } from '@morphic-ts/batteries/lib/program'
import { M, summonFor } from '@morphic-ts/batteries/lib/summoner-BASTJ'
import { ProgramType } from '@morphic-ts/batteries/lib/usage/ProgramType'
import { fastCheckConfig } from '../lib/config'

const { summon } = summonFor<{}>({})

const testProgram = <A>(prog: ProgramType<{}, unknown, A>[ProgramUnionURI]) => {
  const { arb, type } = summon(prog)
  fc.assert(fc.property(arb, type.is))
}

describe('FastCheck interpreter', () => {
  it('string', () => {
    testProgram(summon(F => F.string()))
  })

  it('string can be customized for FastCheck', () => {
    const res = summon(F => F.stringCfg({ ...fastCheckConfig(A => A.noShrink()) }))
    testProgram(res)
  })

  it('string can be customized via a specific generator', () => {
    testProgram(
      summon(F =>
        F.stringCfg({
          ...fastCheckConfig(_ => fc.constantFrom('scala', 'haskell', 'purescript', 'typescript', 'haxe'))
        })
      )
    )
  })

  it('stringLiteral', () => {
    testProgram(summon(F => F.stringLiteral('x')))
  })

  it('keysOf', () => {
    testProgram(summon(F => F.keysOf({ a: null, b: null })))
  })

  it('array', () => {
    testProgram(summon(F => F.array(F.string())))
  })

  it('array is bounded by config', () => {
    fc.check(
      fc.property(
        summon(F =>
          F.arrayCfg(F.string())({
            ...fastCheckConfig(A => A)
          })
        ).arb,
        arr => arr.length >= 2 && arr.length <= 4
      )
    )
  })

  it('interface', () => {
    testProgram(
      summon(F =>
        F.interface(
          {
            a: F.string(),
            b: F.number()
          },
          'AB'
        )
      )
    )
  })

  it('partial', () => {
    testProgram(
      summon(F =>
        F.partial(
          {
            a: F.string(),
            b: F.number()
          },
          'AB'
        )
      )
    )
  })

  it('compose', () => {
    // type Foo
    const Foo = summon(F =>
      F.interface(
        {
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    // type Bar
    const Bar = summon<unknown, BarType>(F =>
      F.interface(
        {
          a: Foo(F),
          b: F.number()
        },
        'Bar'
      )
    )
    interface BarType {
      a: {
        a: string
        b: number
      }
      b: number
    }

    testProgram(Bar)
  })

  it('date', () => {
    // type Foo
    const Foo = summon<unknown, Foo>(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    interface Foo {
      date: Date
      a: string
    }

    testProgram(Foo)
  })

  it('intersection', () => {
    // type Foo
    const Foo = summon(F =>
      F.interface(
        {
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    const Bar = summon(F =>
      F.interface(
        {
          c: F.string(),
          d: F.number()
        },
        'Bar'
      )
    )

    const FooBar = summon(F => F.intersection([Foo(F), Bar(F)], 'FooBar'))

    testProgram(FooBar)
  })

  it('union', () => {
    // type Foo
    interface Foo {
      a: string
      b: number
    }
    const Foo = summon(F =>
      F.interface(
        {
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    interface Bar {
      c: string
      d: number
    }
    const Bar = summon(F =>
      F.interface(
        {
          c: F.string(),
          d: F.number()
        },
        'Bar'
      )
    )
    const Bara = summon(F =>
      F.interface(
        {
          ca: F.string(),
          d: F.number()
        },
        'Bara'
      )
    )
    const Barb = summon(F =>
      F.interface(
        {
          cb: F.string(),
          d: F.number()
        },
        'Barb'
      )
    )

    const FooBar = summon(F => F.union([Foo(F), Bar(F), Bara(F), Barb(F)], 'FooBar'))

    testProgram(FooBar)
  })

  it('taggedUnion', () => {
    // type Foo
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    const Foo = summon<unknown, Foo>(F =>
      F.interface(
        {
          type: F.stringLiteral('foo'),
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    interface Bar {
      type: 'bar'
      c: string
      d: number
    }

    const Bar = summon<unknown, Bar>(F =>
      F.interface(
        {
          type: F.stringLiteral('bar'),
          c: F.string(),
          d: F.number()
        },
        'Bar'
      )
    )

    const FooBar = summon(F =>
      F.taggedUnion(
        'type',
        {
          foo: Foo(F),
          bar: Bar(F)
        },
        'FooBar'
      )
    )

    testProgram(FooBar)
  })

  it('set from array', () => {
    const InterfA = summon(F =>
      F.interface(
        {
          a: F.string()
        },
        'InterfA'
      )
    )

    type AType = ReturnType<typeof InterfA.build>

    const ordA = ord.contramap(ordString, (x: AType) => x.a)

    const SetInterfA = summon(F => F.set(InterfA(F), ordA))

    testProgram(SetInterfA)
  })

  it('recursive', () => {
    type List = Cons | Leaf
    interface Cons {
      type: 'cons'
      a: List
    }
    interface Leaf {
      type: 'leaf'
      v: string
    }

    const List: M<{}, unknown, List> = summon<unknown, List>(F =>
      F.recursive<{}, unknown, List>(
        Self =>
          F.taggedUnion(
            'type',
            {
              cons: F.interface({ type: F.stringLiteral('cons'), a: Self }, 'Cons'),
              leaf: F.interface({ type: F.stringLiteral('leaf'), v: F.string() }, 'Leaf')
            },
            'List'
          ),
        'ListRec'
      )
    )

    testProgram(List)
  })
})
