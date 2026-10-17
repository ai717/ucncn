# ========================================================
# UCNCN 本地预览服务一键启动脚本
# ========================================================

$Port = 28765
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       UCNCN 网站本地预览服务一键启动 (端口 $Port)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查并关闭旧进程
Write-Host "[1/3] 检查端口 $Port 占用情况..." -ForegroundColor Yellow
$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connections) {
    $pids = $connections.OwningProcess | Select-Object -Unique
    foreach ($pidToKill in $pids) {
        if ($pidToKill -gt 0) {
            try {
                $proc = Get-Process -Id $pidToKill -ErrorAction SilentlyContinue
                $procName = if ($proc) { $proc.ProcessName } else { "PID: $pidToKill" }
                Write-Host "      [!] 发现旧服务进程 ($procName, PID: $pidToKill)，正在终止重启..." -ForegroundColor Magenta
                Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
            } catch {
                # 忽略权限或其他错误
            }
        }
    }
    Start-Sleep -Milliseconds 600
    Write-Host "      [√] 旧进程已清理完成。" -ForegroundColor Green
} else {
    Write-Host "      [√] 端口 $Port 当前空闲，无冲突进程。" -ForegroundColor Green
}

# 2. 检查 Python 环境
Write-Host ""
Write-Host "[2/3] 检查 Python 运行环境..." -ForegroundColor Yellow
$pythonExe = (Get-Command python -ErrorAction SilentlyContinue)
if (-not $pythonExe) {
    Write-Host "[错误] 系统未检测到 python 命令，请确认 Python 已安装并加入环境变量 PATH。" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "      [√] Python 已就绪: $($pythonExe.Source)" -ForegroundColor Green
Write-Host "      根目录: $ScriptDir" -ForegroundColor Gray
Write-Host "      主页:   http://localhost:$Port/" -ForegroundColor Gray
Write-Host "      观影:   http://localhost:$Port/movie/" -ForegroundColor Cyan

# 3. 唤起浏览器
Write-Host ""
Write-Host "[3/3] 正在启动浏览器访问观影报告..." -ForegroundColor Yellow
Start-Process "http://localhost:$Port/movie/"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  服务已启动！" -ForegroundColor Green
Write-Host "  - 网址: http://localhost:$Port/movie/" -ForegroundColor White
Write-Host "  - 提示: 关闭此窗口即可停止服务。" -ForegroundColor White
Write-Host "  - 提示: 重新双击本脚本会自动重启该端口的服务。" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""

# 4. 启动 Python HTTP Server
python -m http.server $Port --bind 127.0.0.1
