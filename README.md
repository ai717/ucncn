# 菜鸟笔记 (ucncn.cn)

菜鸟笔记（ucncn.cn）官方网站代码库，包含主站前端、静态资产与实验性子项目。

## 快速导航

- 📘 **开发与项目归属规范（必读）**：[DEVELOPMENT_SPEC.md](DEVELOPMENT_SPEC.md)
  > 详细说明了“主站子项目（如 `ucncn.cn/movie/`）”与“独立挂靠二级域名项目（如 `m.ucncn.cn`、`md/`）”的区分原则、Git 隔离机制及部署规则。
- 🧪 **主站实验室项目规范**：[projects/README.md](projects/README.md)
  > 挂载在主站下的纯静态/现代框架小项目接入指南。
- 🌐 **Nginx 部署参考**：[nginx.conf.example](nginx.conf.example)

---

## 本地开发与预览

- 运行 `start_server.bat` 或 `start_server.ps1` 启动本地静态服务（默认端口 8080）。
- 运行 `stop_server.bat` 或 `stop_server.ps1` 停止本地服务。

---

## 自动化部署

- 本项目通过 GitHub Actions（`.github/workflows/deploy.yml`）在推送到 `main` 分支时自动部署至生产 VPS 环境。
- 任何标记为挂靠二级域名的独立项目（如 `money/`、`md/`）均已配置在 `.gitignore` 中，与主站提交及发布完全隔离。
