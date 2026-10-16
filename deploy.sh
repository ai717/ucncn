#!/usr/bin/env bash
# 菜鸟笔记 (ucncn.cn) VPS 本地极速更新备用脚本
# 适用目录：/www/wwwroot/ucncn.cn

TARGET_DIR="/www/wwwroot/ucncn.cn"

if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
fi

cd "$TARGET_DIR"

if [ ! -d ".git" ]; then
  echo "📦 初始化远程仓库..."
  git init
  git remote add origin https://github.com/ai717/ucncn.git || git remote set-url origin https://github.com/ai717/ucncn.git
  git fetch origin main
  git checkout -f -B main origin/main
else
  echo "🔄 同步最新版本..."
  git fetch origin main
  git reset --hard origin/main
fi

echo "✅ 更新成功！当前版本："
git log -1 --oneline
