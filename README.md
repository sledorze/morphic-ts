# Face-ts (temporary name)

The Extensible Code First approach you've been dreaming of

This library adress the pain of writting and maintaining derived code for business logic
Namely:

- Smart Ctors
- Predicates
- Structural equality
- Matchers
- Validators
- Schema generation
- Pretty print of data structure
- ...

## Getting Started

(TODO: add the steps)

## How

The library uses a Code first approach
In order to be open to new kind of data (via Algebras) and derivation (via Interpreters) we use an approach via a (finally) tagless encoding

On may define what Algebra he needs (either reusing some or writing some new one), writes it's scheme and immediately benefits from derivation by interpreting the Schema by some interpreters
In case no interepreter exist for a particular Algebra, the end user can extend it non intrusively thanks to the composable nature of the technic employed

## Batteries included

(TODO: add links to the libs implemented)

## Examples

(TODO: add some reassuring examples of creation and usages)

## Limitations

## Roadmap

- Stategy for a growing number of Algebras / Interpreters

## Disclaimer

BEWARE, THIS REPO IS A POC (WORK-IN-PROGRESS)
THE API IS IN UNSTABLE STATE AND MAY CHANGE
USE AT YOUR OWN RISK)
