@echo off
chcp 65001 >nul
title Stop UCNCN Local Server (Port 28765)
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop_server.ps1"
