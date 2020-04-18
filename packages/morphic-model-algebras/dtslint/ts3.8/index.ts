import { ModelAlgebraTaggedUnions } from '../../src/tagged-unions'
import { ModelAlgebraPrimitive } from '../../src/primitives'
import { ModelAlgebraObject } from '../../src/object'
import { Eq } from 'fp-ts/lib/Eq'
import { genConfig } from '@morphic-ts/common/lib/config'
import {} from '@morphic-ts/algebras/lib/hkt'

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    ['Eq']: (env: R) => TypeEq<A>
  }
}

// Eq def
export class TypeEq<A> {
  _A!: A
  constructor(ord: Eq<A>) {}
}
const eqConfig = genConfig('Eq')

const dummy = 42 // $ExpectType 42

const foo = <F, R>(f: (x: ModelAlgebraTaggedUnions<F> & ModelAlgebraPrimitive<F> & ModelAlgebraObject<F>) => R): R =>
  f as any
const summon = <F, R>(f: (x: ModelAlgebraTaggedUnions<F> & ModelAlgebraPrimitive<F> & ModelAlgebraObject<F>) => R) => f

// $ExpectType HKT2<unknown, {}, { type: string; }, { type: "a"; }>
foo(F => F.taggedUnion('type', { a: F.interface({ type: F.stringLiteral('a') }, 'A') }, 'X'))

// $ExpectType HKT2<unknown, {}, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    { a: F.interface({ type: F.stringLiteral('a') }, 'A'), b: F.interface({ type: F.stringLiteral('b') }, 'B') },
    'X'
  )
)

interface Deps {
  dep: string
}
interface Deps2 {
  dep2: string
}

// $ExpectType HKT2<unknown, { Eq: Deps; }, string, "a">
foo(F => F.stringLiteralCfg<'a'>('a')({ ...eqConfig((x, d: Deps) => x) }))

// $ExpectType HKT2<unknown, { Eq: Deps; }, { type: string; }, { type: "a"; }>
foo(F => F.interface({ type: F.stringLiteralCfg<'a'>('a')({ ...eqConfig((x, d: Deps) => x) }) }, 'A'))

// $ExpectType HKT2<unknown, { Eq: Deps; }, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface({ type: F.stringLiteralCfg<'a'>('a')({ ...eqConfig((x, d: Deps) => x) }) }, 'A'),
      b: F.interface({ type: F.stringLiteralCfg<'b'>('b')({ ...eqConfig((x, d: Deps) => x) }) }, 'B')
    },
    'X'
  )
)

// $ExpectType HKT2<unknown, { Eq: Deps & Deps2; }, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface({ type: F.stringLiteralCfg<'a'>('a')({ ...eqConfig((x, d: Deps) => x) }) }, 'A'),
      b: F.interface({ type: F.stringLiteralCfg<'b'>('b')({ ...eqConfig((x, d: Deps2) => x) }) }, 'B')
    },
    'X'
  )
)

const A = summon(F => F.interface({ type: F.stringLiteralCfg<'a'>('a')({ ...eqConfig((x, d: Deps) => x) }) }, 'A'))
const B = summon(F => F.interface({ type: F.stringLiteralCfg<'b'>('b')({ ...eqConfig((x, d: Deps2) => x) }) }, 'B'))

// $ExpectType HKT2<unknown, { Eq: Deps & Deps2; }, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: A(F),
      b: B(F)
    },
    'X'
  )
)

interface SpecificConfig {}

// tslint:disable-next-line: max-line-length
// $ExpectType HKT2<unknown, { Eq: SpecificConfig; }, { a: string; b: string; }, { a: string; b: string; }>
foo(F => {
  // $ExpectType HKT2<unknown, { Eq: SpecificConfig; }, { a: string; b: string; }, { a: string; b: string; }>
  const res = F.interface({ a: F.stringCfg({ ...eqConfig((x, e: SpecificConfig) => x) }), b: F.string }, 'A')
  return res
})

// tslint:disable-next-line: max-line-length
// $ExpectType HKT2<unknown, { Eq: { fc: SpecificConfig; }; }, string[], string[]>
foo(F => F.array(F.stringCfg({ ...eqConfig((x, e: { fc: SpecificConfig }) => x) })))

// tslint:disable-next-line: max-line-length
// $ExpectType HKT2<unknown, { Eq: { t: SpecificConfig; }; }, string[], string[]>
foo(F => F.array(F.stringCfg({ ...eqConfig((x, e: { t: SpecificConfig }) => x) })))
