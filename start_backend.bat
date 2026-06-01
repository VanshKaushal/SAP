@echo off
title SAP Cognitive Workflow Orchestra - Backend
setlocal enabledelayedexpansion

:: --- ENTERPRISE UI CONFIG ---
set "SEP==================================================="
set "BANNER=   SAP COGNITIVE WORKFLOW ORCHESTRA"
set "SUB=   BACKEND INTELLIGENCE ENGINE"

:: --- INITIALIZATION ---
echo %SEP%
powershell -Command "Write-Host '%BANNER%' -ForegroundColor Cyan"
powershell -Command "Write-Host '%SUB%' -ForegroundColor Gray"
echo %SEP%
echo.

cd /d "%~dp0"

:: --- STEP 1: PYTHON CHECK ---
echo [BOOT] 1/3 Verifying Python Runtime...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Write-Host '[FAIL] Python is not installed or not in PATH.' -ForegroundColor Red"
    pause
    exit /b
)
powershell -Command "Write-Host '[OK] Python Runtime Detected' -ForegroundColor Green"

:: --- STEP 2: DEPENDENCIES ---
echo [BOOT] 2/3 Synchronizing dependencies...
if exist "backend\requirements.txt" (
    :: We install from the backend directory but run from root
    pushd backend
    pip install -q -r requirements.txt
    if %errorlevel% neq 0 (
        powershell -Command "Write-Host '[FAIL] Dependency installation failed.' -ForegroundColor Red"
        popd
        pause
        exit /b
    )
    popd
    powershell -Command "Write-Host '[OK] Dependencies Synchronized' -ForegroundColor Green"
) else (
    powershell -Command "Write-Host '[WARN] requirements.txt not found. Skipping install.' -ForegroundColor Yellow"
)

:: --- STEP 3: DATABASE SEEDING ---
echo [BOOT] 3/3 Orchestrating database state...
:: Ensure we are in root for seeding
if not exist "sap_orchestra.db" (
    powershell -Command "Write-Host '[INFO] No database found. Seeding initial environment...' -ForegroundColor Gray"
    python -m backend.utils.seed_db
    if %errorlevel% neq 0 (
        powershell -Command "Write-Host '[WARN] Database seeding encountered an issue.' -ForegroundColor Yellow"
    ) else (
        powershell -Command "Write-Host '[OK] Database Seeded Successfully' -ForegroundColor Green"
    )
) else (
    powershell -Command "Write-Host '[INFO] Existing database detected.' -ForegroundColor Gray"
)

echo.
echo %SEP%
powershell -Command "Write-Host '   CORE INTELLIGENCE OPERATIONAL' -ForegroundColor Green"
powershell -Command "Write-Host '   Lauching FastAPI Orchestrator...' -ForegroundColor Cyan"
echo %SEP%
echo.

:: --- START SERVER ---
:: Critical: Run as a module from root to preserve package structure
python -m backend.main

if %errorlevel% neq 0 (
    powershell -Command "Write-Host '[CRITICAL] Backend server halted unexpectedly.' -ForegroundColor Red"
    pause
)
