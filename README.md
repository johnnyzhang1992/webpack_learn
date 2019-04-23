# webpack 搭建学习

## 四个核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。
在更高层面，在 webpack 的配置中 loader 有两个目标：

- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

``` js
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：

> “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”

### loader 特性

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。
- loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和其他更多

### 插件(plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

webpack.config.js

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### 模式(mode)

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。

`string`

#### 用法

只在配置中提供 mode 选项：

```js
module.exports = {
  mode: 'production'
};
```

或者从 CLI 参数中传递：

```js
webpack --mode=production
```

> 支持以下字符串值：

| 选项 | 描述 |
| ----| ---- |
|   development   |  production    |
|  会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。    |   会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin`.   |

### tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

#### 将文件标记为无副作用(side-effect-free)

这种方式是通过 package.json 的 "sideEffects" 属性来实现的。

``` json

{
  "name": "your-project",
  "sideEffects": false
}
```

如果你的代码确实有一些副作用，那么可以改为提供一个数组：

``` json
{
  "name": "your-project",
  "sideEffects": [
    "./untils/math.js",
    "*.css"
  ]
}
```

最后，还可以在 module.rules 配置选项 中设置 "sideEffects"。

``` js
module.rules: [
  {
    include: path.resolve("node_modules", "lodash"),
    sideEffects: false
  }
]
```

### bundle 分析(bundle analysis)

Install

```js
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

Usage (as a plugin)

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

### webpack SplitChunksPlugin

首先webpack会根据下述条件自动进行代码块分割：

- 新代码块可以被共享引用，或者这些模块都是来自node_modules文件夹里面
- 新代码块大于30kb（min+gziped之前的体积）
- 按需加载的代码块，并行请求最大数量应该小于或者等于5
- 初始加载的代码块，并行请求最大数量应该小于或等于3

#### 配置项

相关配置项：

``` js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', 
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', 
      name: true,
      cacheGroups: {}
    }
  }
}
```

- chunks: 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
- minSize: 表示在压缩前的最小模块大小，默认为30000
- minChunks: 表示被引用次数，默认为1
- maxAsyncRequests: 按需加载时候最大的并行请求数，默认为5
- maxInitialRequests: 一个入口最大的并行请求数，默认为3
- automaticNameDelimiter: 命名连接符
- name: 拆分出来块的名字，默认由块名和hash值自动生成
- cacheGroups: 缓存组。缓存组的属性除上面所有属性外，还有test, priority, reuseExistingChunk

- test: 用于控制哪些模块被这个缓存组匹配到
- priority: 缓存组打包的先后优先级
- reuseExistingChunk: 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块

配置项基本就上面这些，我们重点来看下chunks和cacheGroups。

> chunks

里面有提到initial模式下会分开优化打包异步和非异步模块。而all会把异步和非异步同时进行优化打包。

> 使用cacheGroups可以自定义配置打包块。

``` js
// indexA.js
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'

// indexB.js
import React from 'react'
import ReactDOM from 'react-dom'
import('lodash')
import $ from 'jquery'

// webpack.config.js
optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
```

上面已经提到了设置chunks: initial || all都可以提取出第三方库。但是它是把所有第三库提取出来，所以我们在只提取react和react-dom的情况下，需要自定义一个cacheGroup。

```js
// indexA.js
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'

// webpack.config.js
entry: {
    indexA: path.join(__dirname, 'src/indexA.js')
},
optimization: {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            vendors: {
                test: /react/,
                name: 'vendors'
            }
        }
    }
}
```

我们去重写了vendors打包块，只打包匹配react的模块，所以达到了之前CommonsChunkPlugin的功能。

或者

``` js
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

// webpack.config.js
entry: {
    indexA: path.join(__dirname, 'src/indexA.js'),
    vendor: ["react", "react-dom"]
},
optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: "vendor",
                chunks: "initial"
            }
        }
    }
}
```

webpack 打包入口增加一个vendor入口，里面包括所有需要另外打包出来的库，然后在cacheGroups设置这个打包块chunks: initial || all，也能把indexA和vendor中重复的库提取到vendor打包块中。