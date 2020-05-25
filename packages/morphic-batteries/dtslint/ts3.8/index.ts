import type { SelectKeyOfMatchingValues } from '../../src/usage/utils'
import { summonFor } from '../../src/summoner-BASTJ'
import type { EOfMorhpADT, IfStringLiteral, AOfMorhpADT } from '../../src/usage/tagged-union'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { interpretable } from '../../src/usage/programs-infer'
import type { ADT } from '@morphic-ts/adt'
// tslint:disable-next-line: no-duplicate-imports
import { unionADT, intersectADT } from '@morphic-ts/adt'
import type { Remove, ElemType, ExtractUnion } from '@morphic-ts/adt/lib/utils'

type IsLiteralA = IfStringLiteral<'a', 'ok', 'string', 'notString'> // $ExpectType "ok"
type IsLiteralString = IfStringLiteral<string, 'ok', 'string', 'notString'> // $ExpectType "string"
type IsLiteralNumber = IfStringLiteral<number, 'ok', 'string', 'notString'> // $ExpectType "notString"

type RemoveAFromAB = keyof Remove<{ a: number; b: string }, 'a'> // "b"

interface Dummy {
  dummyValue: string
}

type ElemArrayA = ElemType<Dummy[]> // $ExpectType Dummy
type ElemA = ElemType<Dummy> // $ExpectType never
type ElemString = ElemType<string> // $ExpectType never

interface ADTFoo0 {
  type: 'ADTFoo0'
}
const ADTFoo0: ADT<ADTFoo0, ADTTag> = 1 as any
interface ADTFoo1 {
  type: 'ADTFoo1'
}
const ADTFoo1: ADT<ADTFoo1, ADTTag> = 1 as any
interface ADTFoo2 {
  type: 'ADTFoo2'
}
const ADTFoo2: ADT<ADTFoo2, ADTTag> = 1 as any
type ADTTag = 'type'

type ADTFoo01 = ADT<ADTFoo0 | ADTFoo1, ADTTag>
const ADTFoo01: ADTFoo01 = 1 as any

type ADTFoo12 = ADT<ADTFoo1 | ADTFoo2, ADTTag>
const ADTFoo12: ADTFoo12 = 1 as any

const unionADTRes = unionADT([ADTFoo01, ADTFoo12]) // $ExpectType ADT<ADTFoo0 | ADTFoo1 | ADTFoo2, "type">
const unionADTRes2 = unionADT([ADTFoo0, ADTFoo1, ADTFoo2]) // $ExpectType ADT<ADTFoo0 | ADTFoo1 | ADTFoo2, "type">

const intersectADTRes = intersectADT(ADTFoo01, ADTFoo12) // $ExpectType ADT<ADTFoo1, "type">

type Extracted = ExtractUnion<{ type: 'x'; b: string } | { type: 'y'; c: string }, 'type', 'x'> // $ExpectType { type: "x"; b: string; }

const symA = Symbol()
const symB = Symbol()
const symC = Symbol()

interface Bag {
  [symA]: { type: string }
  [symB]: { tag: number }
  [symC]: { tag: number; type: string }
}

type SelectKeyOfMatchingValuesA = SelectKeyOfMatchingValues<Bag, { type: string }> // $ExpectType typeof symA | typeof symC
type SelectKeyOfMatchingValuesB = SelectKeyOfMatchingValues<Bag, { type: number }> // $ExpectType never
type SelectKeyOfMatchingValuesC = SelectKeyOfMatchingValues<Bag, { tag: any }> // $ExpectType typeof symB | typeof symC
type SelectKeyOfMatchingValuesD = SelectKeyOfMatchingValues<Bag, { tag: number; type: string }> // $ExpectType typeof symC
type SelectKeyOfMatchingValuesE = SelectKeyOfMatchingValues<Bag, { atag: number }> // $ExpectType never

interface ARaw {
  a: string
  type: string
}
interface A {
  a: string
  type: 'A'
}
interface BRaw {
  b: string
  type: string
}
interface B {
  b: string
  type: 'B'
}
interface CRaw {
  c: string
  type: string
}
interface C {
  c: string
  type: 'C'
}

const { summon, tagged } = summonFor<{}>({})

const A = summon<ARaw, A>(F => F.interface({ type: F.stringLiteral('A'), a: F.string() }, 'A'))
const B = summon<BRaw, B>(F => F.interface({ type: F.stringLiteral('B'), b: F.string() }, 'B'))
const C = summon<CRaw, C>(F => F.interface({ type: F.stringLiteral('C'), c: F.string() }, 'C'))

// $ExpectType MorphADT<{ A: [ARaw, A]; B: [BRaw, B]; C: [CRaw, C]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI", {}>
const ABC = tagged('type')({
  A,
  B,
  C
})

// $ExpectType MorphADT<{ A: [ARaw, A]; B: [BRaw, B]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI", {}>
ABC.selectMorph(['A', 'B'])

// $ExpectType MorphADT<{ B: [BRaw, B]; C: [CRaw, C]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI", {}>
ABC.excludeMorph(['A'])

// $ExpectType A | B | C
type AM = AOfMorhpADT<typeof ABC>
// $ExpectType ARaw | BRaw | CRaw
type EM = EOfMorhpADT<typeof ABC>

// $ExpectType (env: {}) => FastCheckType<A | B | C>
interpretable(ABC)(modelFastCheckInterpreter())

// $ExpectType M<{}, { a: string; b: string; }, { a: string; b: string; }>
summon(F => F.interface({ a: F.string(), b: F.string() }, 'A'))
