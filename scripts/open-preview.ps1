param([switch]$NoBrowser)

$ErrorActionPreference = 'Stop'
$tyxxRoot = Split-Path -Parent $PSScriptRoot
$tyxxUrl = 'http://127.0.0.1:4180/strand.html'
$tyxxRuntime = Join-Path $tyxxRoot '.sites-runtime'

function Test-TyxxPreview {
    try {
        $tyxxResponse = Invoke-WebRequest -UseBasicParsing -Uri $tyxxUrl -TimeoutSec 2
        return $tyxxResponse.StatusCode -eq 200 -and $tyxxResponse.Headers['X-TYXX-Preview'] -eq 'strand'
    } catch {
        return $false
    }
}

if (-not (Test-TyxxPreview)) {
    $tyxxNode = Get-Command node -ErrorAction Stop
    New-Item -ItemType Directory -Path $tyxxRuntime -Force | Out-Null
    $tyxxProcess = Start-Process -FilePath $tyxxNode.Source -ArgumentList 'scripts/serve.mjs' `
        -WorkingDirectory $tyxxRoot -WindowStyle Hidden -PassThru `
        -RedirectStandardOutput (Join-Path $tyxxRuntime 'preview.log') `
        -RedirectStandardError (Join-Path $tyxxRuntime 'preview-error.log')
    $tyxxReady = $false
    for ($tyxxAttempt = 0; $tyxxAttempt -lt 20; $tyxxAttempt++) {
        if ($tyxxProcess.HasExited) {
            throw 'No se pudo iniciar la vista de TYXX. Revisar .sites-runtime/preview-error.log; el puerto 4180 puede estar ocupado.'
        }
        if (Test-TyxxPreview) { $tyxxReady = $true; break }
        Start-Sleep -Milliseconds 250
    }
    if (-not $tyxxReady) {
        throw 'La vista local no respondió. Revisar .sites-runtime/preview-error.log.'
    }
    Set-Content -LiteralPath (Join-Path $tyxxRuntime 'preview.pid') -Value $tyxxProcess.Id
}

Write-Output "TYXX actualizado: $tyxxUrl"
if (-not $NoBrowser) { Start-Process $tyxxUrl }
