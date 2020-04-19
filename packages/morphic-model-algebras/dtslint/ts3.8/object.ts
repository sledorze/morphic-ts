import { EnvOfProps } from '../../src/object'
import { URIS, HKT2 } from '@morphic-ts/common/lib/HKT'
import { TypeEq } from '.'

type U = URIS

// $ExpectType unknown
type A = EnvOfProps<{
  x: HKT2<'Eq', unknown, string, string>
  y: HKT2<'Eq', unknown, string, string>
}>

// $ExpectType {}
type B = EnvOfProps<{
  x: HKT2<'Eq', {}, string, string>
  y: HKT2<'Eq', unknown, string, string>
}>

// $ExpectType { FastCheckURI: { fc: { a: string; }; }; } & { FastCheckURI: { fc: { b: string; }; }; }
type C = EnvOfProps<{
  x: HKT2<
    'Eq',
    {
      FastCheckURI: {
        fc: { a: string }
      }
    },
    string,
    string
  >
  y: HKT2<
    'Eq',
    {
      FastCheckURI: {
        fc: { b: string }
      }
    },
    string,
    string
  >
}>

// $ExpectType { FastCheckURI: { fc: { a: string; }; }; }
type D = EnvOfProps<{
  x: HKT2<'Eq', unknown, string, string>
  y: HKT2<
    'Eq',
    {
      FastCheckURI: {
        fc: { a: string }
      }
    },
    string,
    string
  >
}>

// $ExpectType { FastCheckURI: { fc: { a: string; }; }; }
type E = EnvOfProps<{
  x: HKT2<'Eq', {}, string, string>
  y: HKT2<
    'Eq',
    {
      FastCheckURI: {
        fc: { a: string }
      }
    },
    string,
    string
  >
}>
