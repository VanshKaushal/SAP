@echo off
title SAP Cognitive Workflow Orchestra - Launcher
setlocal enabledelayedexpansion

:: --- ENTERPRISE UI CONFIG ---
set "SEP==================================================="
set "BANNER=   SAP COGNITIVE WORKFLOW ORCHESTRA"
set "SUB=   UNIFIED ORCHESTRATION LAUNCHER"

:: --- INITIALIZATION ---
echo %SEP%
powershell -Command "Write-Host '%BANNER%' -ForegroundColor Cyan"
powershell -Command "Write-Host '%SUB%' -ForegroundColor White"
echo %SEP%
echo.

cd /d "%~dp0"

echo [SYSTEM] Initiating fullstack boot sequence...
echo.

:: --- START BACKEND ---
echo [1/2] Deploying Backend Intelligence...
start "SAP Backend" cmd /k "%~dp0start_backend.bat"
powershell -Command "Write-Host '[OK] Backend initialization triggered.' -ForegroundColor Green"

:: --- DELAY ---
echo [WAIT] Orchestrating startup delay...
timeout /t 5 /nobreak >nul

:: --- START FRONTEND ---
echo [2/2] Deploying Frontend Interface...
start "SAP Frontend" cmd /k "%~dp0start_frontend.bat"
powershell -Command "Write-Host '[OK] Frontend initialization triggered.' -ForegroundColor Green"

echo.
echo %SEP%
powershell -Command "Write-Host '   SAP COGNITIVE WORKFLOW ORCHESTRA STARTED' -ForegroundColor Cyan"
powershell -Command "Write-Host '   ALL SYSTEMS OPERATIONAL' -ForegroundColor Green"
echo %SEP%
echo.
echo [INFO] Separate terminals have been launched for each service.
echo [INFO] Closing this master launcher will NOT stop the services.
echo.

pause
