# 模块系统

JavaScript 在创建之初是没有模块系统的，随着前端的发展，先后出现了多种模块规范，本篇将大致介绍这几种规范。

## ESM

ESM 是 ES6 中提出的模块规范，相信大家都用过，而且在较新版本中也采用了 ESM 模块规范，其具体使用方式如下：

```js
import axios from 'axios'
```

详情可参考 [ECMAScript 6 入门 - Module 的语法](https://es6.ruanyifeng.com/#docs/module)

## AMD

AMD（Asynchronous Module Definitions）规范因RequireJS而出名，其适用于浏览器端，commonjs常被用于node中，当然其也可通过Browserify用于浏览器中。

amd 用法如下：

```js
// 文件名: foo.js
define(['jquery'], function ($) {
  // 方法
  function myFunc(){};

  // 暴露公共方法
  return myFunc;
})
```

定义的第一个部分是一个依赖数组，第二个部分是回调函数，只有当依赖的组件可用时（像RequireJS这样的脚本加载器会负责这一部分，包括找到文件路径）回调函数才被执行。

理想状态下，期望其依赖是异步加载的，通过在中注入script，不阻塞浏览器的加载和渲染，但实际环境下，其表现的没有那么好，因此需要amd 模块为一个单文件模块并与require.js 优化器配合来进行渲染

总结如下：

- 异步加载
- 其被提出，主要用于客户端browser
- 其语法不直观，没有commonjs便于书写

### commonjs

如果你用node写过东西的话，你可能会很熟悉commonjs风格，其用法如下：

```js
// 文件名: foo.js

exports.exports = "Foo"
```

```js
// 文件名: bar.js

var foo = require('./foo.js')
console.log(foo)  // "Foo"
```

总结如下：

- 语法类似于node，因为node使用commonjs规范
- commonjs导入模块是同步导入
- 主要用于后端，客户端用的话需要通过Browserify
- 书写直观

## umd

UMD 其实是 amd 和 commonjs 的统一规范，支持两种规范，这样就可以写一套代码，可用于多种场景，旧版本的 underscore 就是使用 UMD 规范。其具体代码如下：

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};

    //    暴露公共方法
    return myFunc;
}));
```

毋庸置疑的是，其写法也是最复杂的

- 前后端均通用
- 与CJS或AMD不同，UMD更像是一种配置多个模块系统的模式。
- UMD在使用诸如Rollup/ Webpack之类的bundler时通常用作备用模块
