# esker

Fluent query strings

```url
companions/name.is.Amelia_and_age.is.greater.than.22
```

## Queries

Esker looks at query strings as a sequence of one or more sentences. Sentences are conjuncted using the logical conjunctions `_and_` and `_or_`. 

Example:

```url
year.is.2015_and_style.is.soul
```

## Sentences

Sentences basically follow the structure `<field><comparison><value>`.

The `<field>` is the name of the property / field to filter against.

The `<value>` is the value the field should be compared against

The `<comparison>` is a verb than can be mixed with modificators (`not`) and optional conjunctions (`than`). Supported verbs are:

* equality: `is`, `equals`
* partial equality, membership: `contains`, `has`
* greater than: `greater`, `larger`, `more`
* smaller than: `smaller`, `less`

Note: when using greater / smaller than comparisons, you are free to still use the `is`, `equals` verbs. E.g. `age.is.less.than.10`

To make queries more readable, the optional `than` conjunctions can be added.

To inverse comparison, the `not` modificator can be added.

Here a few examples

```javascript
// items that have the name 'Amelia'
name.is.Amelia
name.equals.Amelia
// items that do NOT have the name 'Amelia'
name.is.not.Amelia
// items whose name contains 'eli'
name.contains.eli
// items whose age is more than 20
age.is.more.than.20
age.greater.than.20
age.greater.20
// items whose price is less than 10
price.is.less.than.10
price.is.smaller.than.10
price.smaller.10
// items whose price is less than 10 (using not)
price.is.not.more.than.9
```

## Usage

Esker's central (and currently only exposed) method is `parse(<query-string>)`. To use Esker, first install it:

```shell
npm install esker --save
```

Import it as a module then use the `parse()` method on your query string.

```javascript
const esker = require('esker')

let result = esker.parse('name.is.Amelia')
```

The `result` will contain an object containing an array of object (one for each sentence passed). 

Each sentence is represented as an object with the properties `field`, `verb`, `not`, `value`, `operatorLeft`, `operatorRight`. The above example (`'name.is.Amelia'`), results in:

```json
{
    'field': 'name',
    'verb': 'is',
    'not': false,
    'value': 'Amelia,
    'operatorLeft': 'none',
    'operatorRight': 'none'
}
```

The `verb` field may contain one of the following values:

- `'is'` - equality
- `'has'` - partial equality, membership
- `'>'` - greater than
- `'<'` - less than

The `not` field is set to true if the sentence contains the modifier `'not'`.

The `operatorLeft` and `operatorRight` express and sentence's relation to its neighbours (see Logical Operators). It may contain one of the following values:

- `'none'`
- `'and'`
- `'or'`



## Logical Operators

Sentences can be combined using the `'_and_'` and `'_or_'` operators. Here an example:

```javascript
color.is.blue_and_price.is.10_or_color.is.red
```

Note that Esker currently does not support defining any operator precedence by means of brackets.
Logical operators are simply added to the result's `sentences` items as `operatorLeft` and `operatorRight` properties.

How these operators are interpreted depends on the extension used (see section on Extensions)


## Extensions

The `parse()` method takes a second (optional) attribute, an extension method. This can be any method take takes and array of sentences and returns an object.

The returned object is then added to the result as the value of the `output` property.

Currently Esker comes with a MongoDB extension. Here is how you use it:

```javascript
const esker = require('esker')

let query = 'color.is.blue_and_price.is.10_or_color.is.red'

let result = esker.parse(query, esker.mongo)

// result.output contains an object that you now can use as the filter in a MongoDB find() call
let filter = result.output
```
