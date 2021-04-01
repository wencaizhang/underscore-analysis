<Block>
# underscore 架构

[源码地址](https://github.com/jashkenas/underscore/blob/master/underscore.js)

<img src="https://underscorejs.net/img/underscore.png" alt="underscorejs" style="
    width: 70%;
">

</Block>

<Block>

## 立即执行函数

与其他第三方库一样，underscore 最外层是一个**立即执行函数**。

这样做有两个好处：

1. **避免全局污染**：所有的逻辑、变量的定义都被封装到该函数的作用域内部。
2. **隐私保护**：在立即执行函数中声明的函数、变量等，除非是主动向外部暴露，否则无法在外部获得。

立即执行函数调用时，形参 `global` 和 `factory` 分别对应实参 `this` 和 `underscore` 的主体代码函数。


<Example>

```js
(function (global, factory) {
  // ...
}(this, (function () {
  // underscore 主体代码
})))
```

</Example>

</Block>


<Block>

## 立即执行函数内部

### 嵌套的三元表达式

在立即执行函数内部，通过嵌套的三元表达式依次按照 CMD、AMD 和原生 JS 的写法向外暴露 underscore。

嵌套的三元表达式的写法看起来很复杂，我们可以改为 `if...else...` 的形式，如下：

```js
// 如果是 CMD 环境，按照 CMD 规范向外暴露函数
if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = factory()

// 如果是 AMD 环境，按照 AMD 规范向外暴露
} else if (typeof define === 'function' && define.amd) {
  define('underscore', factory)

} else {
  // 既不是 CMD 也不是 AMD，将 underscore 挂载到全局对象上
  // 这部分代码下面进一步解释
}
```

<Example>

```js
(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :

  typeof define === 'function' && define.amd ? define('underscore', factory) :

  (global = global || self, (function () {
    var current = global._;
    var exports = global._ = factory();
    exports.noConflict = function () { global._ = current; return exports; };
  }()));
}(this, (function () {
  // underscore 主体代码
})))
```

</Example>

</Block>

<Block>

## 如何挂载到全局对象上

<Example>

```js
(global = global || self, (function () {
  var current = global._;
  var exports = global._ = factory();
  exports.noConflict = function () { global._ = current; return exports; };
}()));
```

</Example>

这部分代码写的也很有技巧性，这部分代码分成赋值语句和匿名函数自执行两部分，中间是逗号隔开，结构如下：

```
(赋值语句, 匿名函数自执行)
```

赋值语句实际上是要再次确定全局变量的值：

```js
global = global || self
```

再来看匿名函数自执行：

```js
function () {
  var current = global._;
  var exports = global._ = factory();
  exports.noConflict = function () { global._ = current; return exports; };
}()
```

一句一句地来解释。

首先将全局对象 `global` 的 `_` **原属性值** 赋值给变量 `current`

接着通过工厂函数 `factory()` 来获取 underscore 实例，并将其连续赋值给 `global` 的 `_` 属性和变量 `export`。

最后给 `exports` 绑定了一个 `noConflict` 函数，这是用于处理命名冲突的问题。

</Block>


<Block>

## _ 既是一个对象，也是一个函数

首先 _ 是一个对象，所有的工具方法我们都需要通过对象属性的方式来调用，如 `_.each`，`_.map` 等。

但同时，`_` 也是一个函数，用 `_(obj)` 的形式来创建 underscore 的实例对象，实例对象享有和 `_` 相同的函数属性。

这一点和 jQuery 十分相似。

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
