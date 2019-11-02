import { Remove, ElemType, IfStringLiteral } from '../../src/common/index'
import { ADT, unionADT, intersectADT } from '../../src/interpreters/builder/adt'

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
interface ADTFoo1 {
  type: 'ADTFoo1'
}
interface ADTFoo2 {
  type: 'ADTFoo2'
}
type ADTTag = 'type'
type ADTFoo01 = ADT<ADTFoo0 | ADTFoo1, ADTTag>
type ADTFoo12 = ADT<ADTFoo1 | ADTFoo2, ADTTag>
const ADTFoo01: ADTFoo01 = 1 as any
const ADTFoo12: ADTFoo12 = 1 as any

const unionADTRes = unionADT(ADTFoo01, ADTFoo12) // $ExpectType ADT<ADTFoo0 | ADTFoo1 | ADTFoo2, "type">
const intersectADTRes = intersectADT(ADTFoo01, ADTFoo12) // $ExpectType ADT<ADTFoo1, "type">
