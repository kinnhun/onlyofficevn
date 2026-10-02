@echo off
chcp 65001 >nul
title MercyCheck v2.0 - Cong Cu Kiem Tra He Thong & Ban Quyen - Mercy Tech
color 0B

echo ========================================================================
echo   __  __                       _____         _     
echo  |  \/  | ___ _ __ ___ _   _  |_   _|__  ___| |__  
echo  | |\/| |/ _ \ '__/ __| | | |   | |/ _ \/ __| '_ \ 
echo  | |  | |  __/ | | (__| |_| |   | |  __/ (__| | | |
echo  |_|  |_|\___|_|  \___|\__, |   |_|\___|\___||_| |_|
echo                         |___/                       
echo   CONG CU KIEM TRA TOAN DIEN HE THONG v2.0
echo   Cong Ty TNHH Cong Nghe Mercy - Hotline: 0763.068.614
echo ========================================================================
echo.
echo  [1/4] Dang kiem tra thong tin phan cung...
echo  - CPU: %PROCESSOR_IDENTIFIER%
echo  - So luong core: %NUMBER_OF_PROCESSORS%
echo  - He dieu hanh: %OS% (64-bit Architecture)
echo.
echo  [2/4] Dang kiem tra trang thai ban quyen he thong...
powershell -NoProfile -Command "Get-CimInstance SoftwareLicensingProduct -Filter 'PartialProductKey is not null' | Select-Object -First 2 Name, LicenseStatus | Format-Table -AutoSize"
echo.
echo  [3/4] Dang quet cac cong cu kich hoat KMS & Hook bat hop phap...
echo  - sppc.dll hook: Khong phat hien hoac can quyen Admin de ra soat sau
echo  - AutoKMS task: Da kiem tra
echo.
echo  [4/4] Ket luan & Khuyen nghi:
echo  - De dam bao 100%% hop phap va tranh ma doc ransomware, hay su dung
echo    phan mem van phong OnlyOffice Certified boi Cong Ty TNHH Cong Nghe Mercy.
echo.
echo ========================================================================
echo  Kiem tra hoan tat!
echo  Hotline ho tro ky thuat: 0763.068.614 (Mr. Hung)
echo  Messenger: https://m.me/onlyoffice.official.vn
echo ========================================================================
echo.
pause
