import { makeADT, ofType } from '../../src'

interface Foo {
  type: 'foo'
  a: string
  b: number
}

interface Bar {
  type: 'bar'
  c: string
  d: number
}

interface Baz {
  type: 'baz'
  e: string
  f: number
}

const fooBar = makeADT('type')({
  foo: ofType<Foo>(),
  bar: ofType<Bar>(),
  baz: ofType<Baz>()
})

fooBar.match({}, x => x) // $ExpectType (a: Foo | Bar | Baz) => Foo | Bar | Baz
fooBar.match({ foo: () => (undefined as any) as never }, x => x) // $ExpectType (a: Foo | Bar | Baz) => Bar | Baz
fooBar.match({ foo: x => x.type, bar: x => x.type, baz: x => x.type }) // $ExpectType (a: Foo | Bar | Baz) => "foo" | "bar" | "baz"

// $ExpectType Reducer<number, Foo | Bar | Baz>
fooBar.createReducer(0)(
  {
    foo: foo => n => n + foo.a.length
  },
  bar_baz => n => n + bar_baz.type.length // $ExpectType (bar_baz: Bar | Baz) => (n: number) => number
)

fooBar.strict<number>(fooBar.match({ foo: () => 1 }, _ => 2)) // $ExpectType (_: Foo | Bar | Baz) => number
