# uncurry-intrinsics

Get an uncurried version of an intrinsic function by name.

## Description

Combines `es-intrinsic-cache` and `uncurry-x` to get and uncurry JavaScript intrinsics in one step.

## Installation

```bash
npm install uncurry-intrinsics
```

## Usage

```javascript
var uncurryIntrinsic = require("uncurry-intrinsics")

// Get uncurried Array.prototype.slice
var slice = uncurryIntrinsic("Array.prototype.slice")
slice([1, 2, 3, 4, 5], 1, 3) // [2, 3]

// Get uncurried String.prototype.split
var split = uncurryIntrinsic("String.prototype.split")
split("foo-bar-baz", "-") // ["foo", "bar", "baz"]

// Get uncurried Array.prototype.map
var map = uncurryIntrinsic("Array.prototype.map")
var doubled = map([1, 2, 3], function (x) {
  return x * 2
}) // [2, 4, 6]
```

## API

### `uncurryIntrinsic(intrinsicName[, allowMissing])`

Gets an intrinsic by name and returns its uncurried version where `this` becomes the first parameter.

**Parameters:**

- `intrinsicName` (string): The name of the intrinsic to get and uncurry (e.g., `"Array.prototype.slice"`)
- `allowMissing` (boolean, optional): If `true`, returns `null` or `undefined` for missing intrinsics instead of throwing an error. Default: `false`

**Returns:**

- (Function|null|undefined): The uncurried intrinsic function, or `null`/`undefined` if `allowMissing` is `true` and the intrinsic doesn't exist

**Throws:**

- Error if the intrinsic is not available and `allowMissing` is `false`

## Examples

### Array methods

```javascript
var uncurryIntrinsic = require("uncurry-intrinsics")

var push = uncurryIntrinsic("Array.prototype.push")
var join = uncurryIntrinsic("Array.prototype.join")

var arr = [1, 2, 3]
push(arr, 4, 5) // 5
join(arr, ", ") // "1, 2, 3, 4, 5"
```

### String methods

```javascript
var uncurryIntrinsic = require("uncurry-intrinsics")

var charAt = uncurryIntrinsic("String.prototype.charAt")
var toUpperCase = uncurryIntrinsic("String.prototype.toUpperCase")

charAt("hello", 0) // "h"
toUpperCase("hello") // "HELLO"
```

### Object methods

```javascript
var uncurryIntrinsic = require("uncurry-intrinsics")

var hasOwnProperty = uncurryIntrinsic("Object.prototype.hasOwnProperty")

var obj = { foo: 1, bar: 2 }
hasOwnProperty(obj, "foo") // true
hasOwnProperty(obj, "baz") // false
```

### Handling missing intrinsics

```javascript
var uncurryIntrinsic = require("uncurry-intrinsics")

// Throws an error if the intrinsic doesn't exist
try {
  var missing = uncurryIntrinsic("NonExistent.prototype.method")
} catch (e) {
  console.log(e.message) // 'Intrinsic "NonExistent.prototype.method" is not available'
}

// Returns null/undefined if allowMissing is true
var maybeExists = uncurryIntrinsic("Reflect.apply", true)
if (maybeExists) {
  // Use the intrinsic
} else {
  // Handle missing intrinsic
}
```

## See Also

- [uncurry-x](https://www.npmjs.com/package/uncurry-x) - Uncurry a function
- [es-intrinsic-cache](https://www.npmjs.com/package/es-intrinsic-cache) - Get cached JavaScript intrinsics

## License

MIT
