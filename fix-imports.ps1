# PowerShell script to fix all remaining import path issues

$rootPath = "d:\Typingweb_V2\src"

Write-Host "Fixing import paths..." -ForegroundColor Green

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path $rootPath -Recurse -Include *.ts,*.tsx -File

$modifiedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Fix @/lib/utils to @/utils/utils
    $content = $content -replace '@/lib/utils', '@/utils/utils'
    
    # Fix @/context/ to @/contexts/
    $content = $content -replace '@/context/', '@/contexts/'
    
    # Fix @/components/os/ to @/components/layout/
    $content = $content -replace '@/components/os/', '@/components/layout/'
    
    # If content changed, write it back
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $modifiedCount++
        Write-Host "Fixed: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nFixed $modifiedCount files" -ForegroundColor Green
