# PowerShell script to fix component imports

$rootPath = "d:\Typingweb_V2\src"

Write-Host "Fixing component imports..." -ForegroundColor Green

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path $rootPath -Recurse -Include *.ts,*.tsx -File

$modifiedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Fix shared component imports
    $content = $content -replace 'from "@/components/AdBanner"', 'from "@/components/shared/AdBanner"'
    $content = $content -replace 'from "@/components/PremiumBadge"', 'from "@/components/shared/PremiumBadge"'
    $content = $content -replace 'from "@/components/QuickStats"', 'from "@/components/shared/QuickStats"'
    $content = $content -replace 'from "@/components/XPProgress"', 'from "@/components/shared/XPProgress"'
    $content = $content -replace 'from "@/components/SocialShare"', 'from "@/components/shared/SocialShare"'
    $content = $content -replace 'from "@/components/CertificateGenerator"', 'from "@/components/shared/CertificateGenerator"'
    
    # Fix typing component imports
    $content = $content -replace 'from "@/components/TypingDisplay"', 'from "@/components/typing/TypingDisplay"'
    $content = $content -replace 'from "@/components/VirtualKeyboard"', 'from "@/components/typing/VirtualKeyboard"'
    $content = $content -replace 'from "@/components/ResultsModal"', 'from "@/components/typing/ResultsModal"'
    $content = $content -replace 'from "@/components/StatsDisplay"', 'from "@/components/typing/StatsDisplay"'
    $content = $content -replace 'from "@/components/HandGesture"', 'from "@/components/typing/HandGesture"'
    
    # If content changed, write it back
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $modifiedCount++
        Write-Host "Fixed: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nFixed $modifiedCount files" -ForegroundColor Green
