# ========================================================
# UCNCN 本地预览服务一键关闭脚本
# ========================================================

$Port = 28765

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       正在停止 UCNCN 本地服务 (端口 $Port)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connections) {
    $pids = $connections.OwningProcess | Select-Object -Unique
    foreach ($pidToKill in $pids) {
        if ($pidToKill -gt 0) {
            try {
                $proc = Get-Process -Id $pidToKill -ErrorAction SilentlyContinue
                $procName = if ($proc) { $proc.ProcessName } else { "PID: $pidToKill" }
                Write-Host "[!] 发现运行中的服务进程 ($procName, PID: $pidToKill)，正在关闭..." -ForegroundColor Yellow
                Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
            } catch {
                # 忽略权限或其他错误
            }
        }
    }
    Start-Sleep -Milliseconds 500
    Write-Host "[√] 服务已成功停止！" -ForegroundColor Green
} else {
    Write-Host "[i] 当前端口 $Port 没有正在运行的服务。" -ForegroundColor Gray
}

Write-Host ""
Start-Sleep -Seconds 2
