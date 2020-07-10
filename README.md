<Block>
# underscore 架构

[源码地址](https://github.com/jashkenas/underscore/blob/master/underscore.js)

</Block>


<Block>

## 作用域包裹

与其他第三方库一样，underscore 也通过**立即执行函数**来包裹自己的代码。

这样做有两个好处：

1. **避免全局污染**：所有的逻辑、变量的定义都被封装到该函数的作用域内部。
2. **隐私保护**：在立即执行函数中声明的函数、变量等，除非是主动向外部暴露，否则无法在外部获得。

立即执行函数调用时，形参 `global` 和 `factory` 分别对应实参 `this` 和 `underscore` 的主体代码函数。

而在立即执行函数内部，通过嵌套的三元表达式依次按照 CMD、AMD 和原生 JS 的写法向外暴露 underscore。

如果感觉嵌套的三元表达式的写法看起来复杂，就改为 `if...else...` 的形式，如下：

```js
if (typeof exports === 'object' && typeof module !== 'undefined') {
  // 如果是 CMD 环境，按照 CommonJS 规范向外暴露函数
  module.exports = factory()
} else if (typeof define === 'function' && define.amd) {
  // 如果是 AMD 环境，按照 AMD 规范向外暴露
  define('underscore', factory)
} else {
  // 既不是 CMD 也不是 AMD，将 underscore 挂载到全局对象上
  // 这部分代码下面进一步解释
}
```

当既不是 CMD 也不是 AMD 环境，将 underscore 挂载到全局对象上时，这里分成了两步，第一步确定 `global` 的值：


```js
(global = global || self, (
  // 立即执行函数向外暴露 underscore
));
```

第二步才是获取 underscore

```js
// 立即执行函数向外暴露 underscore
function () {
  var current = global._;
  var exports = global._ = factory();
  exports.noConflict = function () { global._ = current; return exports; };
}()
```


<Example>

```js
// global 接收下面通过 this 传入的值
// factory 接收一个 function，function 内部是实现 underscore 具体代码
(function (global, factory) {
  // 如果是 CMD 环境，按照 CommonJS 规范向外暴露函数
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  // 如果是 AMD 环境，按照 AMD 规范向外暴露
  typeof define === 'function' && define.amd ? define('underscore', factory) :
  // 既不是 CMD 也不是 AMD，将 underscore 挂载到全局对象上
  (global = global || self, (function () {
    var current = global._;
    var exports = global._ = factory();
    exports.noConflict = function () { global._ = current; return exports; };
  }()));
}(this, (function () {
  // 主体代码
})))
```

</Example>

</Block>

<Block>

## _ 是一个对象

`_` 是一个函数对象，所有的 api 都会被挂载到这个对象上，如 `_.each`，`_.map` 等。

## _ 也是一个函数

但同时，`_` 也是一个函数，用 `_(obj)` 的形式来创建 underscore 的实例 instance，instance 享有和 `_` 相同的函数。


<Example>

```js
// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
}
```

</Example>

</Block>


<Block>

## mixin

mixin (混入) 模式是增加代码复用度的一个广泛使用的**设计模式**

`_.mixin(obj)` 为 underscore 对象混入 `obj` 具有的功能

underscore 内部正是通过这一功能将 `_` 的所有静态方法，添加到原型 `_.prototype` 上，使得 underscore 的实例也具有了这些静态方法。


<Example>

```js
// Add your own custom functions to the Underscore object.
function mixin(obj) {
  each(functions(obj), function(name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
}
```
</Example>

</Block>



<Block>

## 链接式调用

jQuery 的链接式调用

```js
$('.div').css('color', 'red').show();
```

但 jQuery 的链式调用是通过返回 `this` 来实现，例如：

```js
var Rules = function () {
  add (x) => {
    console.log(x)
    return this
  },
  mult (y) {
    console.log(y)
    return this
  }
}

Rules.add(4).mult(5)
```

而 underscore 也可以链式调用：

```js
var result = _([-1, 1, 2, 3])
  .chain()
  .filter(function (value, index) {
    return value > 0;
  })
  .map(function (value, index) {
    return value * value;
  })
  .value();

console.log(result);
// [1, 4, 9]
```

具体的实现方式会在[链式调用](./Chaining/README)中详细分析。


<Example>

```js
// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
}
```
</Example>


</Block>
