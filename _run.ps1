$ErrorActionPreference = "Continue"
Set-Location "e:/A_Project/frontend-ui/apps/docs"
$output = & npx next dev -p 3000 2>&1
$output | Out-File -FilePath "e:/A_Project/frontend-ui/_server.log" -Encoding UTF8
Write-Host "done"
