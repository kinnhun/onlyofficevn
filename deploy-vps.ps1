# Script deploy trực tiếp lên VPS 14.225.207.121
Write-Host "🚀 Đang triển khai trực tiếp lên VPS (14.225.207.121)..." -ForegroundColor Cyan
git push origin main
ssh root@14.225.207.121 "cd /var/www/onlyofficevn && git fetch origin main && git reset --hard origin/main && npm run build && pm2 restart onlyofficevn --update-env && pm2 save"
Write-Host "✅ Triển khai thành công! Website https://onlyofficevietnam.com đã cập nhật." -ForegroundColor Green
