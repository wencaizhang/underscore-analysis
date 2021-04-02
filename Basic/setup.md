# setup

## 开始

<Block>

定义版本信息

</Block>


<Example>

```js
// Current version.
export var VERSION = '1.12.1';
```

</Example>

---

## 顶级对象

<Block>

顶级对象

</Block>


<Example>

```js
// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
export var root = typeof self == 'object' && self.self === self && self ||
          typeof global == 'object' && global.global === global && global ||
          Function('return this')() ||
          {};
```

</Example>

---

## 定义本地变量

<Block>

定义为本地变量，减少作用域链查询长度，提升性能，另外一个角度也可以在对代码压缩混淆时减少代码长度。

</Block>

<Example>

```js

// Save bytes in the minified (but not gzipped) version:
export var ArrayProto = Array.prototype, ObjProto = Object.prototype;
export var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// Create quick reference variables for speed access to core prototypes.
export var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// Modern feature detection.
export var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
    supportsDataView = typeof DataView !== 'undefined';

// All **ECMAScript 5+** native function implementations that we hope to use
// are declared here.
export var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create,
    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

// Create references to these builtin functions because we override them.
export var _isNaN = isNaN,
    _isFinite = isFinite;

// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
export var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
export var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
  'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

// The largest integer that can be represented exactly.
export var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
```

</Example>