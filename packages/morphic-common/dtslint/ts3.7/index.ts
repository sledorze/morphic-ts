import { IsNever, Includes } from '../../src/utils'
import {
  KeepNotUndefinedOrUnknown,
  KeepOptionalIfUndefinedOrUnknownOrUnknown,
  OptionalIfUndefinedOrUnknown,
  KeepNotUnknown
} from '../../src/core'
const dummy = 42 // $ExpectType 42

type UA = IsNever<never, 'Y', 'N'> // $ExpectType "Y"
type UB = IsNever<'never', 'Y', 'N'> // $ExpectType "N"

interface Deps {
  toto: number
}
interface Deps2 {
  toto: number
  tata: string
}

type RRA = Includes<Deps, Deps2, 'Y', 'N'> // $ExpectType "N"
type RRB = Includes<Deps2, Deps, 'Y', 'N'> // $ExpectType "Y"
type RRC = Includes<Deps2, Deps2, 'Y', 'N'> // $ExpectType "Y"
type RRD = Includes<Deps, Deps, 'Y', 'N'> // $ExpectType "Y"
type RRX = Includes<Deps, unknown, 'Y', 'N'> // $ExpectType "Y"
type RRY = Includes<Deps, never, 'Y', 'N'> // $ExpectType "Y"

// $ExpectType { a: "a"; }
type KNU = KeepNotUndefinedOrUnknown<{ a: 'a'; b: undefined; c: unknown }>

// $ExpectType { b?: undefined; } & { c?: unknown; }
type KOIU = KeepOptionalIfUndefinedOrUnknownOrUnknown<{ a: 'a'; b: undefined; c: unknown }>

// $ExpectType Compact<{ a: "a"; } & { b?: undefined; } & { c?: unknown; }>
type OIU = OptionalIfUndefinedOrUnknown<{ a: 'a'; b: undefined; c: unknown }>
