import { IsNever, Includes } from '../../src/utils'
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
