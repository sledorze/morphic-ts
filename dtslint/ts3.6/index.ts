import { Remove, ElemType, VariantType, TagsOf, IfStringLiteral } from '../../src/common/index'

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

interface VariantA {
  type: 'A'
  type2: 'A'
  type3: 'A'
  type4: 'A'
  type5: 'A'
  type6: 1

  a: string
}
interface VariantB {
  type: 'B'
  type2: 'B'
  type3: 'B'
  type4: 'B'
  type5: string
  type6: 2

  b: string
}
type VariantAB = VariantA | VariantB
type VariantTypeA = VariantType<VariantAB, 'type', 'A'> // $ExpectType VariantA

interface VariantC {
  type?: 'C'
  type2: 'C'
  type3: 'C' | undefined
  type4: 'C'
  type5: 'C'
  type6: number

  b: string
}
type VariantABC = VariantA | VariantB | VariantC
type VariantABCTags = TagsOf<VariantABC> // $ExpectType "type2" | "type4"

type SelectVariantTypeA = VariantType<VariantABC, 'type', 'A'> // $ExpectType VariantA
type SelectVariantTypeB = VariantType<VariantABC, 'type', 'B'> // $ExpectType VariantB
type SelectVariantTypeC = VariantType<VariantABC, 'type', 'C'> // $ExpectType never
type SelectVariantType4C = VariantType<VariantABC, 'type4', 'C'> // $ExpectType VariantC
type SelectVariantType4AC = VariantType<VariantABC, 'type4', 'A' | 'C'> // $ExpectType VariantA | VariantC
type SelectVariantTypeNever = VariantType<VariantABC, 'type', never> // $ExpectType never
type SelectVarianTypeNumber = VariantType<VariantABC, 'type', number> // $ExpectType never
type SelectVarianTypeUndefined = VariantType<VariantABC, 'type', undefined> // $ExpectType never

type SelectVariantTypeString = VariantType<VariantABC, 'type', string> // $ExpectType never
type SelectVariantType4String = VariantType<VariantABC, 'type4', string> // $ExpectType never
type SelectVariantNawakString = VariantType<VariantABC, 'nawak', string> // $ExpectType never
type SelectVariantNawakLiteral = VariantType<VariantABC, 'nawak', 'A'> // $ExpectType never
