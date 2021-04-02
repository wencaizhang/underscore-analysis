# 类型判断

## 常规数据类型判断

```js
// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
        return toString.call(obj) === tag;
    };
}

var isString = tagTester('String');

var isNumber = tagTester('Number');

var isDate = tagTester('Date');

var isRegExp = tagTester('RegExp');

var isError = tagTester('Error');

var isSymbol = tagTester('Symbol');

var isArrayBuffer = tagTester('ArrayBuffer');

var isFunction = tagTester('Function');
```

## 特殊类型判断

判断是否为 Object 类型需要注意两点

1. function 使用 typeof 操作符判断结果也是对象
2. null 也是对象类型

```js
// Is a given variable an object?
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

// Is a given value equal to null?
function isNull(obj) {
    return obj === null;
}

// Is a given variable undefined?
function isUndefined(obj) {
    return obj === void 0;
}

// Is a given value a boolean?
function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
}

// Is a given value a DOM element?
function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
}
```

## ArrayBuffer

- [ArrayBuffer —— MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [聊聊JS的二进制家族：Blob、ArrayBuffer和Buffer](https://zhuanlan.zhihu.com/p/97768916)
- [怎么理解 JavaScript 中的 ArrayBuffer？—— 知乎](https://www.zhihu.com/question/30401979)
