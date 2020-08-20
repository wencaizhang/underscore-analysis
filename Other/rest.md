---
title: "rest 参数"
---


<Block>

# rest 参数

rest 参数即自由参数、松散参数，自由和松散是说参数个数是随意的，与之对应的是固定参数。

ES6 引入 rest 参数（形式为 `...变量名`），用于获取函数的多余参数，这样就可以避免使用 `arguments` 对象。

rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

`_.restArguments` 的用法是，通过给该方法传递一个函数，能够使得该函数支持 rest 参数。

例如：

```js
function test (count, rest) {
  console.log(rest)
}

test(1, 2, 3, 4)
// 2，此时 rest 是第二个参数

// 用 restArguments 包装
const restTest = restArguments(test)
restTest(1, 2, 3, 4)
// [2, 3, 4]
// 此时 rest 已经被转换成了自由参数
```


<Example>

restArguments 源码

```js
// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
```

</Example>


</Block>


<Block>

# startIndex 参数

`restArguments` 函数还支持 `startIndex` 参数用于指定 rest 参数的范围

```js
function test (count, rest) {
  console.log(rest)
}

const restTest1 = restArguments(test)
restTest1(1, 2, 3, 4) // [2, 3, 4]

const restTest2 = restArguments(test, 2)
restTest2(1, 2, 3, 4) // [2, 3, 4]

const restTest3 = restArguments(test, 3)
restTest3(1, 2, 3, 4) // [2, 3, 4]
```


startIndex 可省略，缺省状态下，


> **关于 `Function.length`**
> 
> 通过函数的 `length` 属性可得到函数的参数（形参，即函数定义时的参数）个数，
>
> 可参考 MDN 中 [Function.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
>
> 而 `arguments` 是函数实参组成的类数组对象，可以通过 `arguments` 得到实参的个数


<Example>

**部分**源码

```js
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    // some code...
  };
}
```
</Example>

</Block>

