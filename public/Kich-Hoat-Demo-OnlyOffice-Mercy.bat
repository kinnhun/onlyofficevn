@echo off
chcp 65001 >nul
title Cong Cu Kich Hoat OnlyOffice (Dung Thu 7 Ngay) - Mercy Tech
color 0A

:: -----------------------------------------------------------------------
:: 1. KIEM TRA VA TU DONG NANG QUYEN ADMINISTRATOR (CHONG LAP 100%)
:: -----------------------------------------------------------------------
:: Neu da chay voi tham so ELEVATED thi vao thang tien trinh, khong bao gio lap
if /i "%~1"=="ELEVATED" goto :MAIN_PROCESS

:: Kiem tra quyen Admin bang PowerShell Token (Chuan xac 100%, khong phu thuoc dich vu mang)
powershell -NoProfile -ExecutionPolicy Bypass -Command "if (([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) { exit 0 } else { exit 1 }" >nul 2>&1
if %errorLevel% equ 0 goto :MAIN_PROCESS

:: Kiem tra du phong bang fsutil va fltmc
fsutil dirty query %systemdrive% >nul 2>&1
if %errorLevel% equ 0 goto :MAIN_PROCESS

fltmc >nul 2>&1
if %errorLevel% equ 0 goto :MAIN_PROCESS

:: Neu chua co quyen Admin, yeu cau UAC de khoi chay lai kem tham so ELEVATED
echo =======================================================================
echo  CONG CU KICH HOAT ONLYOFFICE - DUNG THU 7 NGAY MIEN PHI
echo  Cung cap boi: CONG TY TNHH CONG NGHE MERCY (MST: 0319227767)
echo  Hotline CSKH: 0763.068.614 - Messenger: m.me/onlyoffice.official.vn
echo =======================================================================
echo.
echo  [!] Dang yeu cau quyen Administrator (UAC) de cai dat he thong...
echo  Vui long bam [YES] hoac [CO] tren man hinh khi xuat hien hop thoai!
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process '%~f0' -ArgumentList 'ELEVATED' -Verb RunAs"
exit /b

:MAIN_PROCESS
:: Chuyen thu muc lam viec ve dung thu muc cua file .bat
cd /d "%~dp0"

:: -----------------------------------------------------------------------
:: 2. TIM FILE SCRIPT POWERSHELL (UU TIEN FILE CO SAN TREN MAY)
:: -----------------------------------------------------------------------
set "PS_SCRIPT="
if exist "%~dp0data\Kich-Hoat-Demo-Script.ps1" (
    set "PS_SCRIPT=%~dp0data\Kich-Hoat-Demo-Script.ps1"
) else if exist "%~dp0Kich-Hoat-Demo-Script.ps1" (
    set "PS_SCRIPT=%~dp0Kich-Hoat-Demo-Script.ps1"
) else if exist "data\Kich-Hoat-Demo-Script.ps1" (
    set "PS_SCRIPT=%CD%\data\Kich-Hoat-Demo-Script.ps1"
) else if exist "Kich-Hoat-Demo-Script.ps1" (
    set "PS_SCRIPT=%CD%\Kich-Hoat-Demo-Script.ps1"
)

if not defined PS_SCRIPT (
    echo =======================================================================
    echo  CONG CU KICH HOAT ONLYOFFICE - DUNG THU 7 NGAY MIEN PHI
    echo  Cung cap boi: CONG TY TNHH CONG NGHE MERCY (MST: 0319227767)
    echo  Hotline CSKH: 0763.068.614 - Messenger: m.me/onlyoffice.official.vn
    echo =======================================================================
    echo.
    echo [i] Dang tai cong cu kich hoat tu Server Mercy Tech...
    set "PS_SCRIPT=%TEMP%\Kich-Hoat-Demo-Script.ps1"
    powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { (New-Object Net.WebClient).DownloadFile('https://onlyoffice.mercytechglobal.com/kich-hoat-demo-onlyoffice-mercy/data/Kich-Hoat-Demo-Script.ps1', '%TEMP%\Kich-Hoat-Demo-Script.ps1') } catch { (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/kinnhun/onlyoffice-mercy/main/web/public/kich-hoat-demo-onlyoffice-mercy/data/Kich-Hoat-Demo-Script.ps1', '%TEMP%\Kich-Hoat-Demo-Script.ps1') }; if (Test-Path '%TEMP%\Kich-Hoat-Demo-Script.ps1') { (Get-Content '%TEMP%\Kich-Hoat-Demo-Script.ps1') -replace 'Start-Process powershell', '# Start-Process' | Set-Content '%TEMP%\Kich-Hoat-Demo-Script.ps1' }"
)

:: -----------------------------------------------------------------------
:: 3. CHAY SCRIPT INLINE TRONG CUA SO NAY (KHONG BAT CUA SO POWERSHELL MOI)
:: -----------------------------------------------------------------------
echo =======================================================================
echo  CONG CU KICH HOAT ONLYOFFICE - DUNG THU 7 NGAY MIEN PHI
echo  Cung cap boi: CONG TY TNHH CONG NGHE MERCY (MST: 0319227767)
echo  Hotline CSKH: 0763.068.614 - Messenger: m.me/onlyoffice.official.vn
echo =======================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

echo.
echo =======================================================================
echo  Tien trinh da hoan tat. Cua so nay duoc giu lai de ban kiem tra.
echo =======================================================================
echo.
echo Nhan phim bat ky de dong cua so nay...
pause >nul
exit /b
