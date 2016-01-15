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


