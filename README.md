# pratique-plugin

A library of functions that covers a number of automated instructions.
包含许多自动指令的函数库。

它包含的东西:

1、使用 `pnpm` 做为包管理器

2、使用 `rollup` 生成压缩包

3、内置了许多自动化脚本以及规范类的东西

如: `Docs`, `Eslint`, `Prettier`, `Husky`, `Jest`, `Shell`, `file parsing`, `file generated`, `Git auto-commit`, `Git Automatic publishing`,

4、内置了一些通用函数 `see to "packages/shared/utils.js"`

5、新添了项目中会使用到的一些函数 `see to "packages/"`

Let's get started.

1、第一步: 安装依赖包

`pnpm i`

2、第二步: 创建文件

`make new <methods-name>` || `npm run create <methods-name>`

3、第三步: 提交代码

`npm run submit <commit-msg> <branch?>`

branch 可选参数，默认使用当前分支

---

```javascript
// 执行代码检查
npm run lint

// 打包
npm run build
npm run build:dev

// 启动文档
npm run docs

// 执行测试
npm run test
npm run test:serve
npm run test:coverage
```
