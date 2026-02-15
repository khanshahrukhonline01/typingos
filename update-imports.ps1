# PowerShell script to update import paths in all TypeScript/TSX files

$rootPath = "d:\Typingweb_V2\src"

# Define replacement patterns
$replacements = @{
    # UI components - old relative paths to new @/ paths
    '\.\/accordion\.tsx' = '@/components/ui/accordion'
    '\.\/alert-dialog\.tsx' = '@/components/ui/alert-dialog'
    '\.\/alert\.tsx' = '@/components/ui/alert'
    '\.\/avatar\.tsx' = '@/components/ui/avatar'
    '\.\/badge\.tsx' = '@/components/ui/badge'
    '\.\/button\.tsx' = '@/components/ui/button'
    '\.\/card\.tsx' = '@/components/ui/card'
    '\.\/dialog\.tsx' = '@/components/ui/dialog'
    '\.\/input\.tsx' = '@/components/ui/input'
    '\.\/label\.tsx' = '@/components/ui/label'
    '\.\/select\.tsx' = '@/components/ui/select'
    '\.\/textarea\.tsx' = '@/components/ui/textarea'
    '\.\/checkbox\.tsx' = '@/components/ui/checkbox'
    '\.\/switch\.tsx' = '@/components/ui/switch'
    '\.\/slider\.tsx' = '@/components/ui/slider'
    '\.\/progress\.tsx' = '@/components/ui/progress'
    '\.\/tabs\.tsx' = '@/components/ui/tabs'
    '\.\/table\.tsx' = '@/components/ui/table'
    '\.\/toast\.tsx' = '@/components/ui/toast'
    '\.\/toaster\.tsx' = '@/components/ui/toaster'
    '\.\/tooltip\.tsx' = '@/components/ui/tooltip'
    '\.\/separator\.tsx' = '@/components/ui/separator'
    '\.\/scroll-area\.tsx' = '@/components/ui/scroll-area'
    
    # Data files
    '\.\/booksData' = '@/data/booksData'
    '\.\/coursesData' = '@/data/coursesData'
    '\.\/enterpriseFeaturesData' = '@/data/enterpriseFeaturesData'
    '\.\/globalExamsData' = '@/data/globalExamsData'
    '\.\/keyboardLayouts' = '@/data/keyboardLayouts'
    '\.\/wordLists' = '@/data/wordLists'
    
    # Hooks
    '\.\/useKeyboardSounds' = '@/hooks/useKeyboardSounds'
    '\.\/useRaceHistory' = '@/hooks/useRaceHistory'
    '\.\/useTestHistory' = '@/hooks/useTestHistory'
    '\.\/useTypingGame' = '@/hooks/useTypingGame'
    '\.\/use-toast' = '@/hooks/use-toast'
    
    # Utils
    '\.\/utils' = '@/utils/utils'
    
    # Contexts
    '\.\/CustomTextContext' = '@/contexts/CustomTextContext'
    '\.\/ExamContext' = '@/contexts/ExamContext'
    '\.\/GamificationContext' = '@/contexts/GamificationContext'
    '\.\/TestHistoryContext' = '@/contexts/TestHistoryContext'
    '\.\/TypingSessionContext' = '@/contexts/TypingSessionContext'
    '\.\/UserModeContext' = '@/contexts/UserModeContext'
    
    # Layout components
    '\.\/AppLayout' = '@/components/layout/AppLayout'
    '\.\/AppSidebar' = '@/components/layout/AppSidebar'
    '\.\/Footer' = '@/components/layout/Footer'
    '\.\/NavLink' = '@/components/layout/NavLink'
    '\.\/OSLayout' = '@/components/layout/OSLayout'
    '\.\/OSTopBar' = '@/components/layout/OSTopBar'
    '\.\/OSLeftDock' = '@/components/layout/OSLeftDock'
    '\.\/OSRightPanel' = '@/components/layout/OSRightPanel'
    '\.\/OSBottomDock' = '@/components/layout/OSBottomDock'
    '\.\/OSMicroHUD' = '@/components/layout/OSMicroHUD'
    
    # Typing components
    '\.\/TypingDisplay' = '@/components/typing/TypingDisplay'
    '\.\/TypingTestBox' = '@/components/typing/TypingTestBox'
    '\.\/VirtualKeyboard' = '@/components/typing/VirtualKeyboard'
    '\.\/ResultsModal' = '@/components/typing/ResultsModal'
    '\.\/StatsDisplay' = '@/components/typing/StatsDisplay'
    '\.\/HandGesture' = '@/components/typing/HandGesture'
    
    # Shared components
    '\.\/PremiumBadge' = '@/components/shared/PremiumBadge'
    '\.\/AdBanner' = '@/components/shared/AdBanner'
    '\.\/QuickStats' = '@/components/shared/QuickStats'
    '\.\/XPProgress' = '@/components/shared/XPProgress'
    '\.\/SocialShare' = '@/components/shared/SocialShare'
    '\.\/CertificateGenerator' = '@/components/shared/CertificateGenerator'
}

Write-Host "Starting import path updates..." -ForegroundColor Green

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path $rootPath -Recurse -Include *.ts,*.tsx -File

$totalFiles = $files.Count
$processedFiles = 0
$modifiedFiles = 0

foreach ($file in $files) {
    $processedFiles++
    Write-Progress -Activity "Updating import paths" -Status "Processing $($file.Name)" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Apply all replacements
    foreach ($pattern in $replacements.Keys) {
        $replacement = $replacements[$pattern]
        $content = $content -replace $pattern, $replacement
    }
    
    # If content changed, write it back
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $modifiedFiles++
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nImport path update complete!" -ForegroundColor Green
Write-Host "Processed: $processedFiles files" -ForegroundColor Cyan
Write-Host "Modified: $modifiedFiles files" -ForegroundColor Cyan
