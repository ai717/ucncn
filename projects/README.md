# 子项目与实验室目录规范 (Projects & Labs)

本目录专门用于存放挂载在主站下的独立小项目。通过子路径部署，既不需要额外新增域名备案，又能安全扩展独立功能。

## 目录结构规划

```text
projects/
├── movie-dna/              # 豆瓣电影基因 (ucncn.cn/projects/movie-dna/)
│   └── index.html
├── devtools/               # 开发者工具箱 (ucncn.cn/projects/devtools/)
└── your-next-project/      # 未来的新项目
```

## 接入新项目规范

1. **纯静态项目（HTML+CSS+JS）：**
   - 直接在 `projects/<项目英文名>/` 下新建文件夹，放入你的 `index.html` 及配套资源即可。
   - 访问地址即为：`https://ucncn.cn/projects/<项目英文名>/`。

2. **现代化前端框架构建的项目（Vue / React / Vite / Next Export）：**
   - 打包时配置 `base` 路径：
     - Vite: 在 `vite.config.js` 中设置 `base: '/projects/<项目英文名>/'`
     - Vue CLI: 在 `vue.config.js` 中设置 `publicPath: '/projects/<项目英文名>/'`
   - 将打包生成的 `dist` 目录下的所有文件，直接拷贝到 `projects/<项目英文名>/` 目录内即可。

3. **合规提示：**
   - 子项目页面底部建议也保留简短的 `苏ICP备2024150485号-5` 链接，以防管局爬虫深度巡检。
   - 个人备案项目切勿集成微信支付/支付宝支付等商业交易，切勿开放公众游客注册发帖。
