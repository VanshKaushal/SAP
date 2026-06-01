@echo off
title SAP Cognitive Workflow Orchestra - Frontend
setlocal enabledelayedexpansion

:: --- ENTERPRISE UI CONFIG ---
set "SEP==================================================="
set "BANNER=   SAP COGNITIVE WORKFLOW ORCHESTRA"
set "SUB=   FRONTEND INTERFACE SYSTEMS"

:: --- INITIALIZATION ---
echo %SEP%
powershell -Command "Write-Host '%BANNER%' -ForegroundColor Cyan"
powershell -Command "Write-Host '%SUB%' -ForegroundColor Gray"
echo %SEP%
echo.

cd /d "%~dp0"

:: --- STEP 1: NODE CHECK ---
echo [BOOT] 1/2 Verifying Node.js Runtime...
node -v >node_ver.tmp 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Write-Host '[FAIL] Node.js is not installed or not in PATH.' -ForegroundColor Red"
    pause
    exit /b
)
set /p NODE_VERSION=<node_ver.tmp
del node_ver.tmp

:: Extract major version
for /f "tokens=1 delims=." %%a in ("%NODE_VERSION%") do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:~1%

if %NODE_MAJOR% GTR 20 (
    powershell -Command "Write-Host '[WARN] Node.js %NODE_VERSION% detected. Optimal version is 20 LTS.' -ForegroundColor Yellow"
    powershell -Command "Write-Host '[INFO] If Vite fails to load rolldown bindings, please use Node 20.' -ForegroundColor Gray"
) else (
    powershell -Command "Write-Host '[OK] Node.js Runtime %NODE_VERSION% detected' -ForegroundColor Green"
)

:: --- STEP 2: DEPENDENCIES ---
echo [BOOT] 2/2 Synchronizing UI dependencies...
if exist "package.json" (
    if not exist "node_modules\" (
        powershell -Command "Write-Host '[INFO] node_modules missing. Performing fresh install...' -ForegroundColor Gray"
        call npm install
    ) else (
        powershell -Command "Write-Host '[OK] Dependencies present' -ForegroundColor Green"
    )
) else (
    powershell -Command "Write-Host '[FAIL] package.json not found in root.' -ForegroundColor Red"
    pause
    exit /b
)

echo.
echo %SEP%
powershell -Command "Write-Host '   UI SYSTEMS OPERATIONAL' -ForegroundColor Green"
powershell -Command "Write-Host '   Launching Vite Development Server...' -ForegroundColor Cyan"
echo %SEP%
echo.

:: --- START SERVER ---
:: We use --force if on high node versions to mitigate binding issues
if %NODE_MAJOR% GTR 20 (
    call npm run dev
) else (
    call npm run dev
)

if %errorlevel% neq 0 (
    powershell -Command "Write-Host '[CRITICAL] Frontend server halted unexpectedly.' -ForegroundColor Red"
    powershell -Command "Write-Host '[RECOVERY] Attempting to fix native bindings...' -ForegroundColor Yellow"
    echo Cleaning node_modules...
    powershell -Command "Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue"
    echo Reinstalling dependencies...
    call npm install
    echo.
    powershell -Command "Write-Host '[INFO] Dependencies reinstalled. Please try starting again.' -ForegroundColor Cyan"
    pause
)
