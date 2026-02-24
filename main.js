# 1. Define the path for the local batch file
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$batchFilePath = Join-Path $desktopPath 'run_bot.bat'

# 2. Define the content for the local batch file
$batchContent = @"
@echo off
setlocal enabledelayedexpansion

:: Discord Webhook URL
set webhookUrl=https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX

:: Message Content
set message=Here you go king :pray:

:: 3. Use PowerShell to send the request (This is the fix)
powershell -Command "Invoke-RestMethod -Uri '%webhookUrl%' -Method Post -ContentType 'application/json' -Body '{''content'':''%message%''}'"

echo Done.
endlocal
"@

# 4. Save the batch file
Set-Content -Path $batchFilePath -Value $batchContent

# 5. Run the batch file
Start-Process -FilePath $batchFilePath
Write-Host "Script generated and launched."
