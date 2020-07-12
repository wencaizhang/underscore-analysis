---
title: "链式调用"
---

# chain


<Block>

## underscore 也支持链式调用

我们知道 jQuery 支持链式调用，链式调用方便我们对一个 DOM 元素进行多次操作，例如：

```js
$('.div').css('color', 'red').show()
```


那你知道 **underscore 也可以链式调用**吗？示例：

```js
var result = _([-1, 1, 2, 3])
  .chain()  // 启用链式调用
  .filter(function (value, index) {  // 过滤出大于 0 的数字
    return value > 0
  })
  .map(function (value, index) {  // 映射为数字的平方
    return value * value
  })
  .value()  // 获取 underscore 的包装值

console.log(result)
// [1, 4, 9]
```

具体的实现方式会在[链式调用](./Chaining/README)中详细分析。



</Block>



<Block>

## underscore 的包装对象

如果 Underscore 被作为函数调用时，它返回一个被包装过的对象。

这个函数有三种情况：

1. 参数 `obj` 是 `_` 的实例：直接返回 `obj`
2. `this` 不是 `_` 的实例：返回 `new _(obj)`
3. `this` 是 `_` 的实例：这种情况是 `_` 作为构造函数使用



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

## 开启链式调用

<Example>

```js
// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = _(obj)
  instance._chain = true
  return instance
}
```

</Example>


</Block>
