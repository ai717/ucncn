@echo off
chcp 65001 >nul
title UCNCN Local Server (Port 28765)
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_server.ps1"
if %ERRORLEVEL% neq 0 (
    echo.
    echo [!] Server process exited with code %ERRORLEVEL%.
    pause
)
