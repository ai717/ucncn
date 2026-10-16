FROM python:3.11-slim

WORKDIR /app

# 复制依赖配置
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 复制项目代码
COPY . .

# 暴露端口
EXPOSE 8765

# 启动服务
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8765"]
