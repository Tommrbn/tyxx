@echo off
powershell.exe -NoProfile -File "%~dp0scripts\open-preview.ps1"
if errorlevel 1 pause
