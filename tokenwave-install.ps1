# TokenWave: ставит и настраивает программу под ключ TokenWave (Windows PowerShell 5.1+).
#   $env:TW_KEY = "sk-..."; $env:TW_APP = "codex"; [Net.ServicePointManager]::SecurityProtocol = 3072; irm https://tokenwave.ru/install.ps1 | iex
# TW_APP: claude-code | claude-vscode | codex | opencode | aider | continue
# Для тестов: TW_NOINSTALL=1 (не ставить программы), TW_HOME (другая домашняя папка),
# TW_BASE (другой адрес для проверки ключа; в настройки всегда пишется https://tokenwave.ru).
# Весь код внутри & { }: без exit (под iex он закрыл бы окно), остановка через throw и return.
& {
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
# 09.11: PowerShell 5.1 по умолчанию без TLS 1.2 — загрузки nodejs.org/github/проверка ключа падали бы с WebException.
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor 3072 } catch { }
$utf8 =New-Object Text.UTF8Encoding $false
$st = @{ Files = @(); Inst = @(); Had = @(); Warn = @() }

# Слияние JSON (как в sh-версии): пишет <файл>.tw-new; код 3 — непустой прежний файл не разобрался.
# Комментарии // /* */ и висячие запятые (opencode.json их допускает) вырезаются, строки не трогаются.
$MergeJs = @'
const isO=v=>v!==null&&typeof v==="object"&&!Array.isArray(v);
const mrg=(a,b)=>{for(const k in b)a[k]=isO(a[k])&&isO(b[k])?mrg(a[k],b[k]):b[k];return a};
const STR=/("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g,COM=/("(?:\\.|[^"\\])*")|,(\s*[}\]])/g;
function twm(A,R,W,E){const f=A[0],s=R(f);let o={},rc=0;
if(s!==null&&s.trim()){try{o=JSON.parse(s.replace(/^\uFEFF/,"").replace(STR,(x,q)=>q||"").replace(COM,(x,q,r)=>q!==undefined?q:r))}catch(e){o=null}
if(!isO(o)){o={};rc=3}}
mrg(o,JSON.parse(E("TW_PATCH").split("{KEY}").join(E("TW_KEY"))));
for(const d of A.slice(1)){const p=d.split("."),l=p.pop();let t=o;for(const k of p)t=isO(t)?t[k]:0;if(isO(t))delete t[l]}
W(f+".tw-new",JSON.stringify(o,null,2)+"\n");return rc}
const fs=require("fs");process.exitCode=twm(process.argv.slice(2),f=>{try{return fs.readFileSync(f,"utf8")}catch(e){return null}},(f,s)=>fs.writeFileSync(f,s),n=>process.env[n]||"")
'@

# 09.11 техкейс 300839106: Claude Code по умолчанию claude-opus-5-5/claude-sonnet-5-5 (ставки те же ×4/×2). Откат: .bak-0911-opus55-0911-2053
$ClaudePatch = '{"env":{"ANTHROPIC_BASE_URL":"https://tokenwave.ru","ANTHROPIC_AUTH_TOKEN":"{KEY}","ANTHROPIC_DEFAULT_OPUS_MODEL":"claude-opus-5-5","ANTHROPIC_DEFAULT_SONNET_MODEL":"claude-sonnet-5-5","ANTHROPIC_DEFAULT_HAIKU_MODEL":"claude-haiku-5-5","ANTHROPIC_SMALL_FAST_MODEL":"claude-haiku-5-5","CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK":"1","DISABLE_TELEMETRY":"1","DISABLE_ERROR_REPORTING":"1","DISABLE_NON_ESSENTIAL_MODEL_CALLS":"1"}}'
$ClaudeDel = @('env.ANTHROPIC_API_KEY', 'env.ANTHROPIC_MODEL', 'apiKeyHelper', 'model')
$ocModels = @()
foreach ($m in @(@('claude-haiku-5-5', 200000), @('claude-opus-5', 200000), @('claude-sonnet-5', 200000), @('claude-fable-5', 200000), @('claude-fable-5-1', 200000), @('claude-fable-5-2', 200000), @('claude-opus-5-5', 200000), @('claude-sonnet-5-5', 200000),
                 @('gpt-6.1-sol', 200000), @('gpt-6-sol', 200000), @('gpt-6-luna', 200000), @('gpt-5.6-sol', 200000), @('gpt-6-astra', 200000), @('gpt-5.6-terra', 200000), @('gemini-3.1-pro', 1000000),
                 @('gemini-3.7-flash', 1000000), @('gemini-3.8-flash', 1000000), @('deepseek-v4-pro', 128000), @('deepseek-v4.1-flash', 128000), @('gpt-5.6-luna', 200000),
                 @('kimi-k3', 256000), @('kimi-k2.7-code', 256000), @('qwen3.8-max', 256000), @('qwen3.8-flash', 128000), @('claude-opus-4-8', 200000), @('claude-opus-4-7', 200000), @('claude-opus-4-6', 200000), @('claude-opus-4-5', 200000), @('claude-sonnet-4-6', 200000), @('claude-sonnet-4-5', 200000), @('claude-haiku-4-5', 200000), @('gemini-3.6-flash', 1000000), @('grok-4.7', 256000), @('grok-4.6', 256000), @('grok-4.5', 256000), @('deepseek-v4-flash', 128000), @('glm-5.3', 200000), @('glm-5.2', 200000), @('glm-5-turbo', 200000), @('glm-5.3-flash', 200000), @('minimax-m3', 200000), @('mimo-v2.5', 128000), @('hy4-preview', 128000), @('composer-2.5-fast', 128000), @('nemotron-3-ultra-550b', 128000), @('nemotron-3-super-120b', 128000), @('nemotron-3-nano-omni-30b', 128000), @('llama-3.2-90b-vision', 128000), @('llama-3.2-11b-vision', 128000), @('gemma-4-31b', 128000), @('gpt-oss-20b', 128000))) {
  $ocModels += '"' + $m[0] + '":{"attachment":true,"modalities":{"input":["text","image"],"output":["text"]},"limit":{"context":' + $m[1] + ',"output":32000}}'
}
$OcPatch = '{"model":"tokenwave/claude-sonnet-5","small_model":"tokenwave/claude-haiku-5-5","provider":{"tokenwave":{"npm":"@ai-sdk/openai-compatible","name":"TokenWave","options":{"baseURL":"https://tokenwave.ru/v1","apiKey":"{KEY}"},"models":{' + ($ocModels -join ',') + '}}}}'

$CodexTop = @'
model_provider = "tokenwave"
model = "gpt-6-astra"
model_context_window = 272000
model_auto_compact_token_limit = 200000
'@
$CodexTable = @'
[model_providers.tokenwave]
name = "TokenWave"
base_url = "https://tokenwave.ru/v1"
wire_api = "responses"
experimental_bearer_token = "{KEY}"
'@

$AiderYml = @'
openai-api-base: https://tokenwave.ru/v1
openai-api-key: "{KEY}"
model: openai/claude-opus-5
weak-model: openai/claude-haiku-5-5
show-model-warnings: false
analytics-disable: true
'@

$ContinueYaml = @'
name: TokenWave
version: 1.0.0
schema: v1
models:
  - name: TokenWave Opus 5
    provider: openai
    model: claude-opus-5
    apiBase: https://tokenwave.ru/v1
    apiKey: "{KEY}"
  - name: TokenWave Haiku
    provider: openai
    model: claude-haiku-5-5
    apiBase: https://tokenwave.ru/v1
    apiKey: "{KEY}"
'@

function Say([string]$t) { Write-Host $t }
function Fail([string]$t) { throw "TWSTOP:$t" }
function Stamp { Get-Date -Format 'yyyyMMdd-HHmmss' }
function Find-App([string]$n) {
  # только .exe/.cmd: при политике Restricted *.ps1-шимы npm не запускаются
  $c = Get-Command $n -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($c) { return $c.Path }
}
# Внешняя команда с выводом на экран; возвращает код выхода.
function Run([string]$exe, [string[]]$a) {
  $ErrorActionPreference = 'Continue'
  try { & $exe @a | Out-Host; return [int]$LASTEXITCODE } catch { return -1 }
}
# 18.10: внешняя команда; stdout и stderr одной строкой при любом коде выхода.
function OutAll([string]$exe, [string[]]$a) {
  $ErrorActionPreference = 'Continue'
  try { return ((@(& $exe @a 2>&1) | ForEach-Object { "$_" }) -join ' ').Trim() } catch { return "$($_.Exception.Message)" }
}
# Внешняя команда; возвращает stdout строкой или $null при ошибке.
function Out1([string]$exe, [string[]]$a) {
  $ErrorActionPreference = 'Continue'
  try {
    $o = & $exe @a 2>$null
    if ($LASTEXITCODE -ne 0) { return $null }
    return ((@($o) | ForEach-Object { "$_" }) -join "`n").Trim()
  } catch { return $null }
}
# Пути из реестра — впереди (только что поставленное), пути этого окна (fnm, nvm и т.п.) — сохраняются.
function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User') + ';' + $env:Path
}

# Копия рядом один раз: <имя>.bak-tokenwave, если занято — с меткой времени.
function Backup([string]$f) {
  if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { return $null }
  if ((Get-Item -LiteralPath $f -Force).Length -eq 0) { return $null }
  $b = "$f.bak-tokenwave"
  if (Test-Path -LiteralPath $b) { $b = "$f.bak-tokenwave-$(Stamp)" }
  Copy-Item -LiteralPath $f -Destination $b -Force
  return $b
}
function Noted([string]$f, $b) {
  if ($b) { $st.Files += "Настроено: $f (прежний сохранён как $b)" } else { $st.Files += "Настроено: $f" }
}
function Ensure-Dir([string]$f) { [void](New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($f))) }
function Write-Utf8([string]$f, [string]$s) { [IO.File]::WriteAllText($f, $s.Replace("`r`n", "`n"), $utf8) }

# Записать текст (UTF-8 без BOM, LF). Совпадает с прежним — ничего не делать; иначе бэкап прежнего.
# Возвращает путь бэкапа или $null.
function Commit([string]$f, [string]$text) {
  $text = $text.Replace("`r`n", "`n")
  $it = Get-Item -LiteralPath $f -Force -ErrorAction SilentlyContinue
  if ($it -and ([IO.File]::ReadAllText($f) -ceq $text)) { Noted $f $null; return $null }
  $b = $null; if ($it) { $b = Backup $f } else { Ensure-Dir $f }
  # скрытый или «только чтение» файл WriteAllText не перезапишет: снять атрибуты на время записи
  $at = $null; if ($it -and ($it.Attributes -band 3)) { $at = $it.Attributes; try { $it.Attributes = 'Normal' } catch { } }
  [IO.File]::WriteAllText($f, $text, $utf8)
  if ($at) { try { $it.Attributes = $at } catch { } }
  Noted $f $b
  return $b
}
# Полная перезапись файла шаблоном; возвращает путь бэкапа.
function Put([string]$f, [string]$text) { return (Commit $f ($text.Replace('{KEY}', $key).TrimEnd() + "`n")) }

function Trim-Blank([string[]]$a) { return ((($a -join "`n") -replace '^\s*\n', '') -replace '\n\s*$', '') }
# config.toml Codex по строкам (без парсера TOML): наши ключи верхнего уровня, прежние верхние ключи без
# model/model_provider/profile, наша таблица, прежние таблицы без [model_providers.tokenwave] и старых
# [profiles.astra|sol|luna|terra]. Повторный запуск даёт тот же файл.
function Codex-Toml([string]$f) {
  $pre = @(); $tbl = @(); $hdr = $false; $drop = $false
  if (Test-Path -LiteralPath $f -PathType Leaf) {
    foreach ($l in ([IO.File]::ReadAllText($f).TrimEnd("`r", "`n") -split "\r?\n")) {
      if ($l -match '^[ \t]*\[') { $hdr = $true; $drop = $l -cmatch '^[ \t]*\[[ \t]*(model_providers\.tokenwave|profiles\.(astra|sol|luna|terra))[ \t]*[\].]' }
      if (-not $hdr) { if ($l -cnotmatch '^[ \t]*(model|model_provider|profile|model_context_window|model_auto_compact_token_limit)[ \t]*=') { $pre += $l } }
      elseif (-not $drop) { $tbl += $l }
    }
  }
  $p = Trim-Blank $pre; $t = Trim-Blank $tbl
  $s = $CodexTop.Replace('gpt-6-astra', $cxm).TrimEnd() + "`n"
  if ($p.Trim()) { $s += "$p`n" }
  $s += "`n" + $CodexTable.Replace('{KEY}', $key).TrimEnd() + "`n"
  if ($t.Trim()) { $s += "`n$t`n" }
  return $s
}
# .aider.conf.yml плоский: прежние строки без наших ключей + наши.
function Aider-Yml([string]$f) {
  $keep = @()
  if (Test-Path -LiteralPath $f -PathType Leaf) {
    $keep = @([IO.File]::ReadAllText($f).TrimEnd("`r", "`n") -split "\r?\n" |
      Where-Object { $_ -cnotmatch '^(openai-api-base|openai-api-key|model|weak-model|show-model-warnings|analytics-disable)\s*:' })
  }
  $s = ''; if (($keep -join '').Trim()) { $s = ($keep -join "`n") + "`n" }
  return $s + $AiderYml.Replace('{KEY}', $key).TrimEnd() + "`n"
}

function Is-Obj($v) { return ($v -is [Management.Automation.PSCustomObject]) }
function Merge-Obj($a, $b) {
  foreach ($p in $b.PSObject.Properties) {
    $c = $a.PSObject.Properties[$p.Name]
    if ($c -and (Is-Obj $c.Value) -and (Is-Obj $p.Value)) { Merge-Obj $c.Value $p.Value }
    elseif ($c) { $c.Value = $p.Value }
    else { Add-Member -InputObject $a -NotePropertyName $p.Name -NotePropertyValue $p.Value }
  }
}

# Слияние JSON: node + merge.js; без node — ConvertFrom-Json/ConvertTo-Json. OnlyNew: без node существующий файл не трогать.
function Merge-Json([string]$f, [string]$patch, [string[]]$del, [switch]$OnlyNew) {
  $node = Find-App 'node'
  if ((-not $node) -and $OnlyNew -and (Test-Path -LiteralPath $f)) { return }
  $bad = $false; $text = $null
  if ($node) {
    Ensure-Dir $f
    $new = "$f.tw-new"
    $tmp = [IO.Path]::Combine([IO.Path]::GetTempPath(), 'tw-merge.js')
    Write-Utf8 $tmp $MergeJs
    $env:TW_PATCH = $patch; $env:TW_KEY = $key   # ключ в окружении только на время вызова node
    try { $rc = Run $node (@($tmp, $f) + $del) }
    finally { Remove-Item Env:TW_PATCH, Env:TW_KEY -ErrorAction SilentlyContinue; Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue }
    if ((($rc -ne 0) -and ($rc -ne 3)) -or -not (Test-Path -LiteralPath $new)) {
      Remove-Item -LiteralPath $new -Force -ErrorAction SilentlyContinue
      $st.Warn += "node не смог слить $f (код $rc) — настройки записаны запасным способом."   # 29.10 техкейс 297982251: раньше стоп. Откат: .bak-t297982251-2910-1320
    } else {
      $text = [IO.File]::ReadAllText($new); Remove-Item -LiteralPath $new -Force
      $bad = ($rc -eq 3)
    }
  }
  if ($null -eq $text) {
    $o = $null; $s = ''
    if (Test-Path -LiteralPath $f -PathType Leaf) { $s = [IO.File]::ReadAllText($f) }
    if ($s.Trim()) { try { $o = $s | ConvertFrom-Json } catch { $o = $null }; $bad = -not (Is-Obj $o) }
    if (-not (Is-Obj $o)) { $o = [pscustomobject]@{} }
    Merge-Obj $o ($patch.Replace('{KEY}', $key) | ConvertFrom-Json)
    foreach ($d in $del) {
      $parts = $d.Split('.'); $t = $o
      for ($i = 0; $i -lt $parts.Length - 1; $i++) {
        $pp = $null; if (Is-Obj $t) { $pp = $t.PSObject.Properties[$parts[$i]] }
        if ($pp) { $t = $pp.Value } else { $t = $null }
      }
      if (Is-Obj $t) { $t.PSObject.Properties.Remove($parts[-1]) }
    }
    $text = ($o | ConvertTo-Json -Depth 20) + "`n"
  }
  $b = Commit $f $text
  if ($bad -and $b) { $st.Warn += "Прежний $f прочитать не удалось — он сохранён как $b, свои настройки из него перенесите вручную." }
}

function Node-Major {
  $n = Find-App 'node'
  if (-not $n) { return 0 }
  $v = Out1 $n @('-v')
  if ($v -match '^v(\d+)') { return [int]$Matches[1] }
  return 0
}

# Код выхода winget; $null — winget нет.
function Winget-Install([string]$id) {
  $wg = Find-App 'winget'
  if (-not $wg) { return $null }
  $rc = Run $wg @('install', '-e', '--id', $id, '--source', 'winget', '--silent', '--accept-package-agreements', '--accept-source-agreements')
  Refresh-Path
  return $rc
}

# Папку — в начало Path пользователя (реестр, без раскрытия %ПЕРЕМЕННЫХ%) и этого окна.
function Add-UserPath([string]$d) {
  $k = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment', $true)
  $p = [string]$k.GetValue('Path', '', 'DoNotExpandEnvironmentNames')
  if (-not (@($p -split ';') -contains $d)) {
    $k.SetValue('Path', (@($d) + @($p -split ';' | Where-Object { $_ })) -join ';', 'ExpandString')
    [Environment]::SetEnvironmentVariable('TW_PATH_PING', $null, 'User')   # оповестить Windows: новые окна увидят Path
  }
  $k.Close()
  $env:Path = "$d;$env:Path"
}

# 11.10: без прав администратора msi через winget падает (1603) — портативный Node.js из zip
# с nodejs.org в %LOCALAPPDATA%\TokenWave, Path пользователя. $true — node готов.
function Node-Portable([int]$min) {
  $arch = 'x64'; if (($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') -or ($env:PROCESSOR_ARCHITEW6432 -eq 'ARM64')) { $arch = 'arm64' }
  try {
    # PS 5.1 отдаёт JSON-массив одним объектом: разворачиваем вручную, иначе Where-Object видит «одну запись»
    $all = foreach ($a in @(Invoke-RestMethod -UseBasicParsing -Uri 'https://nodejs.org/dist/index.json' -TimeoutSec 30)) { foreach ($b in @($a)) { $b } }
    $rel = $all |
      Where-Object { $_.lts -and ($_.version -match '^v(\d+)\.') -and ([int]$Matches[1] -ge $min) -and (@($_.files) -contains "win-$arch-zip") } | Select-Object -First 1
    if (-not $rel) { Say 'Node.js без прав администратора: на nodejs.org не нашлась подходящая версия.'; return $false }
    $name = "node-$($rel.version)-win-$arch"
    $root = [IO.Path]::Combine($env:LOCALAPPDATA, 'TokenWave')
    $dir = [IO.Path]::Combine($root, $name)
    if (-not (Test-Path -LiteralPath ([IO.Path]::Combine($dir, 'node.exe')) -PathType Leaf)) {
      Say "Ставлю Node.js $($rel.version) без прав администратора (в $root)..."
      [void](New-Item -ItemType Directory -Force -Path $root)
      $zip = [IO.Path]::Combine($root, "$name.zip")
      Invoke-WebRequest -UseBasicParsing -Uri "https://nodejs.org/dist/$($rel.version)/$name.zip" -OutFile $zip -TimeoutSec 600
      if (Test-Path -LiteralPath $dir) { Remove-Item -LiteralPath $dir -Recurse -Force }
      Add-Type -AssemblyName System.IO.Compression.FileSystem
      [IO.Compression.ZipFile]::ExtractToDirectory($zip, $root)
      Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
    }
    # программы npm -g — в %APPDATA%\npm, как у обычного установщика (иначе пропадут при смене версии Node)
    $npmrc = [IO.Path]::Combine($dir, 'node_modules', 'npm', 'npmrc')
    if (-not (Test-Path -LiteralPath $npmrc -PathType Leaf)) { Write-Utf8 $npmrc "prefix=`${APPDATA}\npm`n" }
    $gl = [IO.Path]::Combine($env:APPDATA, 'npm')
    [void](New-Item -ItemType Directory -Force -Path $gl)
    Add-UserPath $gl
    Add-UserPath $dir
  } catch {
    Say "Node.js без прав администратора не встал: $($_.Exception.Message)"
    return $false
  }
  return ((Node-Major) -ge $min)
}

function Ensure-Node([int]$min) {
  if ((Node-Major) -ge $min) { return }
  Say 'Ставлю Node.js. Появится окно Windows — нажмите «Да».'
  $rc = Winget-Install 'OpenJS.NodeJS.LTS'
  if (((Node-Major) -lt $min) -and ($rc -ne 0)) { [void](Node-Portable $min) }
  if ($null -eq $rc -and (Node-Major) -lt $min) {
    Fail "Нужен Node.js $min+: скачайте его с https://nodejs.org (кнопка LTS), установите, закройте PowerShell, откройте заново и вставьте команду ещё раз."
  }
  if ((Node-Major) -lt $min) {
    if ($rc -ne 0) { Fail 'Node.js не установился ни через установщик Windows, ни без прав администратора. Поставьте его сами с https://nodejs.org (кнопка LTS), закройте PowerShell, откройте заново и вставьте команду ещё раз. Не выйдет — пришлите снимок этого окна в чат заказа.' }
    Fail 'Node.js поставлен, но это окно его ещё не видит: закройте PowerShell, откройте заново и вставьте команду ещё раз.'
  }
  $st.Inst += 'Node.js ' + (Out1 (Find-App 'node') @('-v'))
}

# npm для установки: @(exe, аргументы-приставка) или $null. 10.10: битый npm в %APPDATA%\npm
# (MODULE_NOT_FOUND) перехватывает и npm.cmd из папки Node — тогда npm-cli.js из комплекта Node напрямую.
function Get-Npm {
  $npm = Find-App 'npm.cmd'
  if ($npm -and (Out1 $npm @('-v'))) { return ,@($npm) }
  $node = Find-App 'node'
  if (-not $node) { return $null }
  $cli = [IO.Path]::Combine([IO.Path]::GetDirectoryName($node), 'node_modules', 'npm', 'bin', 'npm-cli.js')
  if (-not ((Test-Path -LiteralPath $cli -PathType Leaf) -and (Out1 $node @($cli, '-v')))) { return $null }
  if ($npm) { $st.Warn += "npm в профиле Windows сломан — поставил через npm из комплекта Node.js. Починить его: Remove-Item -Recurse -Force `"`$env:APPDATA\npm\node_modules\npm`", `"`$env:APPDATA\npm\npm*`", `"`$env:APPDATA\npm\npx*`" и откройте новое окно PowerShell." }
  return ,@($node, $cli)
}
function Npm-Run($npm, [string[]]$a) { return (Run $npm[0] (@($npm | Select-Object -Skip 1) + $a)) }
# 31.10: обновление уже стоящей программы не должно висеть вечно (npm на зеркале молчал 10+ минут) — по таймауту дерево процессов убиваем, код -2
function Npm-RunT($npm, [string[]]$a, [int]$sec) {
  $all = @($npm | Select-Object -Skip 1) + $a
  $q = ($all | ForEach-Object { if ("$_" -match '[\s"]') { '"' + ("$_" -replace '"', '\"') + '"' } else { "$_" } }) -join ' '
  try {
    $p = Start-Process -FilePath $npm[0] -ArgumentList $q -NoNewWindow -PassThru
    $null = $p.Handle
    if ($p.WaitForExit($sec * 1000)) { return [int]$p.ExitCode }
    try { & taskkill.exe /T /F /PID $p.Id 2>&1 | Out-Null } catch { }
    Say "npm не ответил за $sec с — останавливаю."
    return -2
  } catch { return -1 }
}

# Поставить программу через npm -g. Уже стоит через npm — обновить (старые версии не знают нужных
# настроек); стоит иначе — не трогать.
# Битая локальная база opencode («Database is not empty and has no session table»): непустой .db без таблицы session переименовываем, история там и так пуста
function Fix-OcDb {
  try {
    $d = [IO.Path]::Combine($H, '.local', 'share', 'opencode')
    if (-not (Test-Path -LiteralPath $d -PathType Container)) { return }
    foreach ($f in @(Get-ChildItem -LiteralPath $d -Filter '*.db' -File -ErrorAction SilentlyContinue)) {
      if ($f.Length -eq 0 -or $f.Length -gt 20MB) { continue }
      $txt = [Text.Encoding]::GetEncoding(28591).GetString([IO.File]::ReadAllBytes($f.FullName))
      if ($txt.Contains('session')) { continue }
      $bad = $f.FullName + '.bad-' + (Get-Date -Format 'yyMMddHHmmss')
      Move-Item -LiteralPath $f.FullName -Destination $bad -Force
      foreach ($x in @('-wal', '-shm')) { if (Test-Path -LiteralPath ($f.FullName + $x)) { Move-Item -LiteralPath ($f.FullName + $x) -Destination ($bad + $x) -Force } }
      Say ('Битая локальная база opencode переименована: ' + $f.Name + ' (история в ней была пуста)')
    }
  } catch { }
}

function Npm-App([string]$cmd, [string]$pkg, [int]$min) {
  $upd = $false
  $have = Find-App $cmd
  if ($have -and (Out1 $have @('--version'))) {
    $npm = Get-Npm
    if ((-not $npm) -or ((Node-Major) -lt $min) -or (-not (Out1 $npm[0] (@($npm | Select-Object -Skip 1) + @('ls', '-g', $pkg, '--depth=0'))))) { $st.Had += $cmd; return }
    $upd = $true
  } else { Ensure-Node $min; $npm = Get-Npm }
  if (-not $npm) {
    if (Find-App 'npm.cmd') { Fail 'npm на этом компьютере сломан (не хватает его файлов). Переустановите Node.js с https://nodejs.org (кнопка LTS) поверх старого, закройте PowerShell, откройте заново и вставьте команду ещё раз.' }
    Fail 'npm не найден: закройте PowerShell, откройте заново и вставьте команду ещё раз.'
  }
  if ($upd) { Say "Обновляю $pkg..." } else { Say "Ставлю $pkg..." }
  Say 'Это занимает 1–5 минут без вывода на экран — не закрывайте окно.'
  # 02.11 техкейс 298959614: postinstall пакета идёт через cmd.exe и ищет node в Path; PowerShell его видел, cmd — нет. Папку node — в Path процесса. Откат: .bak-nodepath-0211-1140
  $nd = Find-App 'node'
  if ($nd) { $ndir = [IO.Path]::GetDirectoryName($nd); if (-not (@($env:Path -split ';') -contains $ndir)) { $env:Path = "$ndir;$env:Path" } }
  # --include=optional: нативный бинарь claude/codex приходит optional-зависимостью
  $ia = @('install', '-g', "$pkg@latest", '--include=optional', '--no-fund', '--no-audit', '--no-update-notifier', '--loglevel=error')
  # 17.10: у части провайдеров registry.npmjs.org режется (TLS alert 40, ETIMEDOUT) — второй заход через зеркало
  $reg = @()
  $tmo = 0; if ($upd) { $tmo = 180 }
  if ($(if ($tmo) { Npm-RunT $npm $ia $tmo } else { Npm-Run $npm $ia }) -ne 0) {
    Say 'Каталог npm не ответил — пробую зеркало registry.npmmirror.com...'
    $reg = @('--registry=https://registry.npmmirror.com')
    if ($(if ($tmo) { Npm-RunT $npm ($ia + $reg) $tmo } else { Npm-Run $npm ($ia + $reg) }) -ne 0) {
      if ($upd) { $st.Had += $cmd; $st.Warn += "Не удалось обновить $pkg — осталась прежняя версия."; return }
      Fail "Не удалось поставить $pkg ни из каталога npm, ни из зеркала (причина — в красных строках npm выше). Если там «node не является внутренней командой» — закройте PowerShell, откройте заново и вставьте команду ещё раз (не помогло — переустановите Node.js LTS x64 с https://nodejs.org). Если не скачались файлы, частые причины: антивирус или брандмауэр режет загрузку (отключите на пару минут), нет места на диске, а в СНГ — блокировка провайдера (тогда VPN в режиме «весь трафик»). Вставьте команду ещё раз. Не помогло — пришлите снимок этого окна в чат заказа, по красным строкам найдём причину."
    }
  }
  # путь не из вывода npm: PowerShell 5.1 портит в нём кириллицу (C:\Users\Иван\...)
  $exe = Find-App "$cmd.cmd"
  if (-not $exe) { Refresh-Path; $exe = Find-App "$cmd.cmd" }
  if (-not $exe) {
    $exe = [IO.Path]::Combine($env:APPDATA, 'npm', "$cmd.cmd")
    # 13.10: папки программ npm -g нет в Path — новые окна не находили claude
    if (Test-Path -LiteralPath $exe -PathType Leaf) { Add-UserPath ([IO.Path]::GetDirectoryName($exe)) }
  }
  $v = Out1 $exe @('--version')
  # 08.10: npm пропустил optional-пакет — bin\claude.exe остался заглушкой в ~500 байт
  # («несовместим с версией Windows»): переставить начисто с optional и видимым postinstall
  $bin = [IO.Path]::Combine([IO.Path]::GetDirectoryName($exe), 'node_modules', $pkg, 'bin')
  $stub = @(Get-ChildItem -LiteralPath $bin -Filter '*.exe' -ErrorAction SilentlyContinue | Where-Object { $_.Length -lt 4096 })
  if ((-not $v) -and $stub.Count) {
    Say "Докачиваю нативную часть $pkg..."
    [void](Npm-Run $npm @('uninstall', '-g', $pkg, '--loglevel=error'))
    [void](Npm-Run $npm (@('install', '-g', "$pkg@latest", '--include=optional', '--foreground-scripts', "--allow-scripts=$pkg", '--no-fund', '--no-audit', '--no-update-notifier', '--loglevel=error') + $reg))
    $v = Out1 $exe @('--version')
  }
  # 18.10: заглушка осталась и после докачки — npm не запускает postinstall (ignore-scripts в его настройках) или
  # Node 32-битный (у claude-code нет win32-ia32): install.cjs пакета запускаем сами, его вывод — причина
  $pi = ''
  $js = [IO.Path]::Combine([IO.Path]::GetDirectoryName($bin), 'install.cjs')
  $node = Find-App 'node'
  if ((-not $v) -and $stub.Count -and $node -and (Test-Path -LiteralPath $js -PathType Leaf)) {
    $pi = OutAll $node @($js)
    $v = Out1 $exe @('--version')
  }
  if ((-not $v) -and ($pi -match 'Unsupported platform: win32 ia32')) {
    # переустановка тут не поможет — сказать прямо
    if ([Environment]::Is64BitOperatingSystem) {
      $st.Warn += "$cmd не запустится: Node.js на этом компьютере 32-битный, а $cmd бывает только 64-битным. Поставьте 64-битный Node.js с https://nodejs.org (кнопка LTS, Windows Installer x64) поверх старого, закройте PowerShell, откройте заново и вставьте команду ещё раз."
    } else {
      $st.Warn += "$cmd не запустится: Windows на этом компьютере 32-битная, а $cmd бывает только 64-битным. Пользуйтесь веб-чатом https://tokenwave.ru/chat с тем же ключом."
    }
    return
  }
  if (-not $v) {
    # причину — на экран, настройки всё равно записать: после ручной переустановки они уже на месте
    $why = ''
    try { $why = ((@(& $exe '--version' 2>&1) | ForEach-Object { "$_" }) -join ' ').Trim() } catch { $why = "$($_.Exception.Message)" }
    if ($pi) { $why = "$pi | $why" }
    if ($why.Length -gt 300) { $why = $why.Substring(0, 300) }
    $st.Warn += "$cmd установлен, но не запускается ($exe): $why. Выполните: npm.cmd uninstall -g $pkg; npm.cmd install -g $pkg --include=optional --foreground-scripts --allow-scripts=$pkg — откройте новое окно и наберите $cmd. Не помогло — пришлите снимок этого окна в чат заказа."
    return
  }
  $st.Inst += "$cmd $v"
}

# 13.10: Git, поставленный руками в другом окне, это окно не видит — Path из реестра и обычные папки Git.
function Git-Find {
  if (Find-App 'git') { return $true }
  Refresh-Path
  if (Find-App 'git') { return $true }
  foreach ($d in @("$env:ProgramFiles\Git\cmd", "$env:LOCALAPPDATA\Programs\Git\cmd", [IO.Path]::Combine($env:LOCALAPPDATA, 'TokenWave', 'PortableGit', 'cmd'))) {
    if (Test-Path -LiteralPath ([IO.Path]::Combine($d, 'git.exe')) -PathType Leaf) { $env:Path = "$d;$env:Path"; return $true }
  }
  return $false
}

# 13.10: winget сломан (0x8a15000f — нет данных источника) или его нет — PortableGit с GitHub
# в %LOCALAPPDATA%\TokenWave\PortableGit, Path пользователя, без прав администратора. $true — git готов.
function Git-Portable {
  $arch = '64-bit'; if (($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') -or ($env:PROCESSOR_ARCHITEW6432 -eq 'ARM64')) { $arch = 'arm64' }
  try {
    $rel = Invoke-RestMethod -UseBasicParsing -Uri 'https://api.github.com/repos/git-for-windows/git/releases/latest' -TimeoutSec 30
    $a = @($rel.assets) | Where-Object { $_.name -match "^PortableGit-[\d.]+(-rc\d+)?-$arch\.7z\.exe$" } | Select-Object -First 1
    if (-not $a) { return $false }
    $root = [IO.Path]::Combine($env:LOCALAPPDATA, 'TokenWave')
    $dir = [IO.Path]::Combine($root, 'PortableGit')
    Say "Ставлю Git без winget (в $dir), это 1–3 минуты..."
    [void](New-Item -ItemType Directory -Force -Path $root)
    $sfx = [IO.Path]::Combine($root, $a.name)
    Invoke-WebRequest -UseBasicParsing -Uri $a.browser_download_url -OutFile $sfx -TimeoutSec 900
    $p = Start-Process -FilePath $sfx -ArgumentList "-y -o`"$dir`"" -Wait -PassThru
    Remove-Item -LiteralPath $sfx -Force -ErrorAction SilentlyContinue
    if (-not (Test-Path -LiteralPath ([IO.Path]::Combine($dir, 'cmd', 'git.exe')) -PathType Leaf)) { return $false }
    Add-UserPath ([IO.Path]::Combine($dir, 'cmd'))
    $bash = [IO.Path]::Combine($dir, 'bin', 'bash.exe')
    if (Test-Path -LiteralPath $bash -PathType Leaf) {
      [Environment]::SetEnvironmentVariable('CLAUDE_CODE_GIT_BASH_PATH', $bash, 'User')
      $env:CLAUDE_CODE_GIT_BASH_PATH = $bash
    }
  } catch {
    Say "Git без winget не встал: $($_.Exception.Message)"
    return $false
  }
  return [bool](Find-App 'git')
}

# Нативный Claude Code на Windows требует Git Bash; мягкий шаг — только предупредить.
function Ensure-Git {
  if (Git-Find) { return }
  Say 'Ставлю Git. Появится окно Windows — нажмите «Да».'
  $rc = Winget-Install 'Git.Git'
  if ((-not (Git-Find)) -and ($rc -ne 0)) { [void](Git-Portable) }
  if (Git-Find) { $st.Inst += 'Git' }
  else { $st.Warn += 'Git не установился, а Claude Code на Windows нужен Git Bash: поставьте Git с https://git-scm.com/download/win (настройки по умолчанию), закройте PowerShell, откройте заново и вставьте команду ещё раз.' }
}

function Find-Code {
  $c = Find-App 'code.cmd'
  if ($c) { return $c }
  foreach ($p in @("$env:LOCALAPPDATA\Programs\Microsoft VS Code\bin\code.cmd", "$env:ProgramFiles\Microsoft VS Code\bin\code.cmd")) {
    if (Test-Path -LiteralPath $p) { return $p }
  }
}
function Vsc-Ext([string]$id, [string]$missing) {
  $code = Find-Code
  if (-not $code) { $st.Warn += $missing; return }
  Say "Ставлю расширение $id..."
  [void](Run $code @('--install-extension', $id, '--force'))
  $l = Out1 $code @('--list-extensions')
  if ($l -and ($l -match ('(?mi)^' + [regex]::Escape($id) + '\s*$'))) { $st.Inst += "расширение $id" }
  else { $st.Warn += "Расширение $id не установилось — поставьте его в VS Code вручную (вкладка Extensions)." }
}

function Fix-Policy([string]$cmd) {
  $bad = @('Restricted', 'AllSigned', 'Undefined')
  # 18.10 техкейс 295488320: у PowerShell 7 своя политика (RemoteSigned), а «Открыть в Терминале» открывает
  # Windows PowerShell 5.1 с Restricted — там $cmd.ps1 заблокирован. Из PowerShell 7 разрешаем и для 5.1.
  if ($PSVersionTable.PSEdition -eq 'Core' -and (Get-Command 'powershell.exe' -ErrorAction SilentlyContinue)) {
    $wp = Out1 'powershell.exe' @('-NoProfile', '-Command', 'Get-ExecutionPolicy')
    if ($wp -and ($bad -contains $wp)) {
      [void](OutAll 'powershell.exe' @('-NoProfile', '-Command', 'Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force'))
      $wp = Out1 'powershell.exe' @('-NoProfile', '-Command', 'Get-ExecutionPolicy')
      if ($wp -and ($bad -contains $wp)) { $st.Warn += "Windows PowerShell запрещает скрипты на этом компьютере: в нём запускайте $cmd.cmd вместо $cmd." }
      else { $st.Files += 'Разрешён запуск скриптов и в Windows PowerShell (RemoteSigned для вашего пользователя) — иначе программа в нём не запустится.' }
    }
  }
  if ($bad -notcontains "$(Get-ExecutionPolicy)") { return }
  try { Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force -ErrorAction Stop } catch { }
  if ($bad -contains "$(Get-ExecutionPolicy)") { $st.Warn += "PowerShell запрещает скрипты на этом компьютере: запускайте $cmd.cmd вместо $cmd." }
  else { $st.Files += 'Разрешён запуск скриптов PowerShell для вашего пользователя (RemoteSigned) — иначе программа не запустится.' }
}

# Клик мышью в окне conhost включает выделение («Выбрать» в заголовке) и ставит установку на паузу —
# на время работы выключаю QuickEdit, в finally возвращаю как было. Нет консоли/Add-Type — молча пропуск.
$qe = $null
function QuickEdit-Off {
  try {
    if (-not ('TokenWave.TwCon' -as [type])) {
      Add-Type -Name TwCon -Namespace TokenWave -MemberDefinition '[DllImport("kernel32.dll")] public static extern IntPtr GetStdHandle(int h); [DllImport("kernel32.dll")] public static extern bool GetConsoleMode(IntPtr h, out uint m); [DllImport("kernel32.dll")] public static extern bool SetConsoleMode(IntPtr h, uint m);'
    }
    $h = [TokenWave.TwCon]::GetStdHandle(-10); $m = [uint32]0
    if ([TokenWave.TwCon]::GetConsoleMode($h, [ref]$m) -and ($m -band 0x40)) {
      if ([TokenWave.TwCon]::SetConsoleMode($h, (($m -band (-bnot 0x40)) -bor 0x80))) { return @{ H = $h; M = $m } }
    }
  } catch { }
  return $null
}

try {
  $qe = QuickEdit-Off
  $H = $env:TW_HOME; if (-not $H) { $H = $env:USERPROFILE }; if (-not $H) { $H = $HOME }
  $RealHome = $env:USERPROFILE; if (-not $RealHome) { $RealHome = $HOME }
  $base = $env:TW_BASE; if (-not $base) { $base = 'https://tokenwave.ru' }; $base = $base.TrimEnd('/')

  # 1. Вход
  # ключ, вставленный руками из чата FunPay, несёт невидимые символы (U+2061/U+2063) — режем всё вне печатного ASCII, как asciiKey на /setup
  $raw = "$env:TW_KEY"
  $key = $raw -replace '[^\x21-\x7E]|["'']', ''
  Remove-Item Env:TW_KEY -ErrorAction SilentlyContinue   # установщикам и npm ключ в окружении не нужен
  if ($key -cmatch '^[A-Za-z0-9]{48}$') { $key = "sk-$key" }
  if (-not $key) { Fail 'Ключ не передался: перед $env:TW_KEY при вставке мог появиться невидимый символ, и PowerShell не выполнил первую часть команды. Нажмите Up, затем Home и Delete (удалить первый символ) либо вставьте команду заново через Блокнот; или откройте tokenwave.ru/setup.' }
  if ($raw -match 'ВАШ_КЛЮЧ|YOUR_KEY') { Fail 'В команде нет вашего ключа (стоит заглушка sk-ВАШ_КЛЮЧ). На странице tokenwave.ru/setup нажмите вверху «вставить ключ», вставьте ключ из чата заказа, «Сохранить» — и скопируйте команду заново.' }
  if ($key -cnotmatch '^sk-[A-Za-z0-9]{48}$') { Fail 'Ключ не похож на ключ TokenWave — скопируйте команду со страницы заново.' }
  $app = ("$env:TW_APP" -replace '[\s"'']', '').ToLower()
  $names = @{ 'claude-code' = 'Claude Code'; 'claude-vscode' = 'Claude Code для VS Code'; 'codex' = 'Codex'; 'opencode' = 'OpenCode'; 'aider' = 'Aider'; 'continue' = 'Continue' }
  if (-not $names.ContainsKey($app)) { Fail 'Для этой программы автоустановки нет — инструкция: https://tokenwave.ru/setup' }
  $name = $names[$app]
  $mask = $key.Substring(0, 4) + '…' + $key.Substring($key.Length - 4)
  # 18.10 T-1810-41 A/B (ФД 16:04, решатель 16:07): модель Codex по умолчанию — по ключу, только новые установки. Код последнего
  # символа ключа чётный → gpt-6.1-sol, нечётный → gpt-6-astra (так же в install и у нас: ord(key[-1]) % 2). Отметка установки —
  # в адресе проверки ключа (?tw_install=codex&ab=…&k=последние 4), её собирает /root/dev-agent/tools/codex_ab_scan.py. Откат: .bak-1810-codexab
  $cxm = 'gpt-6-astra'; if ([int]$key[-1] % 2 -eq 0) { $cxm = 'gpt-6.1-sol' }
  $q = ''; if ($app -eq 'codex') { $q = '?tw_install=codex&ab=' + $cxm.Split('-')[-1] + '&k=' + $key.Substring($key.Length - 4) }

  # 2. Ключ живьём (тело ответа не показываем)
  Say "Проверяю ключ $mask..."
  $code = 0
  try {
    $null = Invoke-WebRequest -UseBasicParsing -Uri "$base/v1/models$q" -Headers @{ Authorization = "Bearer $key" } -TimeoutSec 20
    $code = 200
  } catch {
    if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
  }
  if ($code -eq 401) { Fail 'Ключ не принят (401): скопирован не полностью, перенесён или закончился. Проверьте его в кабинете panel.tokenwave.ru' }
  if ($code -eq 0) { Fail 'Нет связи с tokenwave.ru — проверьте интернет; включён VPN — добавьте tokenwave.ru в исключения.' }
  if ($code -ne 200) { Fail "Сервер ответил кодом $code, попробуйте через минуту." }
  # 18.10 T-1810-02 (решатель 04:45): остаток ключа ≤1 млн → Claude Code по умолчанию claude-sonnet-5 ("model" в settings.json),
  # иначе — как было (model удаляем). Остаток = hard_limit_usd − total_usage/100 из /v1/dashboard/billing (у нас в токенах);
  # нет ответа или не разобрали — как было. Так же в install. Откат: .bak-1810-sonnet1m
  $ccm = ''
  if ($app -in 'claude-code', 'claude-vscode') {
    try {
      $bh = @{ Authorization = "Bearer $key" }
      $sub = Invoke-RestMethod -UseBasicParsing -Uri "$base/v1/dashboard/billing/subscription" -Headers $bh -TimeoutSec 15
      $use = Invoke-RestMethod -UseBasicParsing -Uri "$base/v1/dashboard/billing/usage" -Headers $bh -TimeoutSec 15
      if ($null -ne $sub.hard_limit_usd -and $null -ne $use.total_usage) {
        $hl = [double]$sub.hard_limit_usd
        if ($hl -gt 0 -and ($hl - [double]$use.total_usage / 100) -le 1000000) { $ccm = 'claude-sonnet-5-5' }
      }
    } catch { $ccm = '' }
  }

  # 3. Установка (до настроек: с node настройки сливаются надёжнее)
  if ($env:TW_NOINSTALL) {
    $st.Inst += 'ничего (TW_NOINSTALL=1)'
  } else {
    switch ($app) {
      'claude-code' { Npm-App 'claude' '@anthropic-ai/claude-code' 22; Ensure-Git; Fix-Policy 'claude' }
      'codex' { Npm-App 'codex' '@openai/codex' 18; Fix-Policy 'codex' }
      'opencode' { Npm-App 'opencode' 'opencode-ai' 18; Fix-Policy 'opencode'; Fix-OcDb }
      'claude-vscode' { Vsc-Ext 'anthropic.claude-code' 'Установите VS Code (code.visualstudio.com), затем расширение Claude Code — настройки уже на месте.'; Ensure-Git }
      'continue' { Vsc-Ext 'continue.continue' 'Установите расширение Continue в VS Code или плагин Continue в JetBrains — конфиг уже на месте.' }
      'aider' {
        $have = Find-App 'aider'
        if ($have -and (Out1 $have @('--version'))) { $st.Had += 'aider' }
        else {
          $py = Find-App 'py'; $pyA = @('-3')
          if (-not $py) { $pyA = @(); $py = Find-App 'python'; if ($py -and ($py -match 'WindowsApps')) { $py = $null } }
          $ok = $false
          if ($py) {
            Say 'Ставлю Aider через pip...'
            if ((Run $py ($pyA + @('-m', 'pip', 'install', '-q', 'aider-install'))) -eq 0) {
              if ((Run $py ($pyA + @('-m', 'aider_install.main'))) -eq 0) { $ok = $true }
            }
          }
          if (-not $ok) {
            Say 'Ставлю Aider официальным установщиком...'
            [void](Run 'powershell.exe' @('-NoProfile', '-ExecutionPolicy', 'ByPass', '-Command', '[Net.ServicePointManager]::SecurityProtocol = 3072; irm https://aider.chat/install.ps1 | iex'))
          }
          $env:Path = [IO.Path]::Combine($RealHome, '.local', 'bin') + ';' + $env:Path
          $a = Find-App 'aider'; $v = $null; if ($a) { $v = Out1 $a @('--version') }
          if (-not $v) { Fail 'Не удалось установить Aider. Пришлите снимок этого окна в чат заказа.' }
          $st.Inst += $v
        }
      }
    }
  }

  # 4. Настройки
  Say "Записываю настройки $name..."
  switch ($app) {
    { $_ -in 'claude-code', 'claude-vscode' } {
      if ($env:CLAUDE_CONFIG_DIR) { $cs = [IO.Path]::Combine($env:CLAUDE_CONFIG_DIR, 'settings.json'); $cj = [IO.Path]::Combine($env:CLAUDE_CONFIG_DIR, '.claude.json') }
      else { $cs = [IO.Path]::Combine($H, '.claude', 'settings.json'); $cj = [IO.Path]::Combine($H, '.claude.json') }
      if ($ccm) { Merge-Json $cs ('{"model":"' + $ccm + '",' + $ClaudePatch.Substring(1)) @($ClaudeDel | Where-Object { $_ -ne 'model' }) }
      else { Merge-Json $cs $ClaudePatch $ClaudeDel }
      # ключ старого /login (Console) из .claude.json перебивает наш токен → 401 Invalid token
      Merge-Json $cj '{"hasCompletedOnboarding":true}' @('primaryApiKey') -OnlyNew
      if ((-not (Find-App 'node')) -and (Test-Path -LiteralPath $cj -PathType Leaf) -and ([IO.File]::ReadAllText($cj) -match '"primaryApiKey"')) {
        $st.Warn += 'Остался вход в аккаунт Claude — он перебьёт ключ TokenWave: выполните claude /logout и откройте новое окно.'
      }
      if ($app -eq 'claude-vscode') {
        # без этого расширение показывает экран входа (Claude.ai/Console/Bedrock) и не берёт ключ из settings.json
        $vs = [IO.Path]::Combine($env:APPDATA, 'Code', 'User', 'settings.json')
        $ok = (Find-App 'node') -or -not (Test-Path -LiteralPath $vs -PathType Leaf)
        if (-not $ok) { $vt = [IO.File]::ReadAllText($vs); $ok = -not $vt.Trim(); if (-not $ok) { try { $ok = Is-Obj ($vt | ConvertFrom-Json) } catch { } } }
        if ($ok) { Merge-Json $vs '{"claudeCode.disableLoginPrompt":true}' @() }
        else { $st.Warn += 'В VS Code включите вручную: File → Preferences → Settings, поиск «Claude Code login», галочка Disable Login Prompt.' }
      }
      if ($env:ANTHROPIC_API_KEY -or [Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY', 'User')) {
        $st.Warn += 'Переменная ANTHROPIC_API_KEY мешает ключу TokenWave — удалите её (Пуск → «Изменение переменных среды»).'
      }
    }
    'codex' {
      $cd = $env:CODEX_HOME; if (-not $cd) { $cd = [IO.Path]::Combine($H, '.codex') }
      $cf = [IO.Path]::Combine($cd, 'config.toml')
      [void](Commit $cf (Codex-Toml $cf))
      $auth = [IO.Path]::Combine($cd, 'auth.json')
      if (Test-Path -LiteralPath $auth) {
        $ab = "$auth.bak-tokenwave"; if (Test-Path -LiteralPath $ab) { $ab = "$ab-$(Stamp)" }
        Move-Item -LiteralPath $auth -Destination $ab
        $st.Files += "Старый вход через ChatGPT отключён: auth.json переименован в $ab"
      }
      # 24.10 техкейс 296765939: открытое приложение Codex держит прежние настройки до полного перезапуска. Откат: .bak-2410-cxapp
      if (Get-Process -Name 'codex' -ErrorAction SilentlyContinue) { $st.Warn += 'Codex сейчас открыт и работает на прежних настройках: закройте его полностью (приложение — и значок у часов), откройте заново и начните новый чат.' }
    }
    'opencode' {
      $oc = [IO.Path]::Combine($H, '.config', 'opencode', 'opencode.json')
      if (Test-Path -LiteralPath "${oc}c" -PathType Leaf) { $oc = "${oc}c" }   # opencode.jsonc главнее opencode.json — пишем в него
      $ocm = ("$env:TW_MODEL" -replace '[^A-Za-z0-9._-]', '')   # TW_MODEL: модель пакета клиента — и основная, и служебная
      if ($ocm) { $OcPatch = $OcPatch.Replace('tokenwave/claude-sonnet-5', "tokenwave/$ocm").Replace('tokenwave/claude-haiku-5-5', "tokenwave/$ocm") }
      Merge-Json $oc $OcPatch @()
    }
    'aider' { $af = [IO.Path]::Combine($H, '.aider.conf.yml'); [void](Commit $af (Aider-Yml $af)) }
    'continue' {
      $b = Put ([IO.Path]::Combine($H, '.continue', 'config.yaml')) $ContinueYaml
      if ($b) { $st.Warn += "Прежний config.yaml сохранён ($b): его модели и правила переносите вручную." }
    }
  }

  # 5. Итог
  Say ''
  Write-Host "ГОТОВО: TokenWave подключён к $name." -ForegroundColor Green
  Say "Ключ: $mask — принят"
  foreach ($l in $st.Files) { Say $l }
  if ($st.Inst.Count) { Say ('Установлено: ' + ($st.Inst -join '; ')) }
  if ($st.Had.Count) { Say ('Уже было: ' + ($st.Had -join ', ')) }
  switch ($app) {
    'claude-code' {
      Say 'Запуск: откройте НОВОЕ окно терминала, перейдите в папку проекта и наберите claude. Модель меняется командой /model: claude-opus-5-5, claude-sonnet-5-5 или claude-haiku-5-5.'
      Say 'Надпись «auth conflict» — это нормально.'
    }
    'claude-vscode' { Say 'Запуск: полностью закройте VS Code, откройте заново, откройте панель Claude и задайте вопрос. Окно входа появиться не должно; если появилось — запустите эту команду ещё раз уже после установки VS Code.' }
    'codex' {
      Say "Запуск: откройте НОВОЕ окно терминала в папке проекта и наберите codex. По умолчанию модель $cxm. Другая модель: codex -m gpt-5.6-sol (или gpt-5.6-luna, gpt-5.6-terra) или команда /model. Приложение Codex читает тот же config.toml — закройте его полностью (и значок у часов), откройте заново и начните новый чат."
      Say 'Переменная OPENAI_API_KEY больше не нужна; если осталась от старой инструкции (setx) — она не мешает.'
    }
    'opencode' { Say 'Запуск: откройте НОВОЕ окно терминала и в папке проекта наберите opencode. В /models выбирайте только группу TokenWave.'
      Say 'Если окно стало пустым синим или в нём появился текст вроде +q4d73 — это старое окно PowerShell (conhost), оно не умеет рисовать интерфейс opencode. Закройте его и запустите opencode в Windows Terminal (Пуск - Терминал) или во встроенном терминале VS Code. Без интерфейса работает и так: opencode run "привет"'
      Say 'ТОЛЬКО если opencode при запуске сам пишет «Database is not empty and has no session table» (иначе НИЧЕГО не переименовывайте — старые чаты спрячутся) — это битая локальная история, ключ ни при чём. Тогда закройте все окна opencode и выполните в PowerShell: Get-Process | ? Path -like *opencode* | Stop-Process -Force; Rename-Item $env:USERPROFILE\.local\share\opencode opencode-old. Вернуть чаты: переименовать opencode-old обратно в opencode.' }
    'aider' { Say 'Запуск: откройте НОВОЕ окно терминала и в папке проекта (лучше git-репозиторий) наберите aider. Другая модель: aider --model openai/claude-sonnet-5.' }
    'continue' { Say 'Запуск: перезапустите редактор. В списке моделей Continue появятся «TokenWave Opus 5» и «TokenWave Haiku».' }
  }
  if ($ccm) { Say "Ключ до 1 млн токенов — Claude Code по умолчанию на $ccm (вдвое экономнее opus); сменить: /model claude-opus-5-5. / Key up to 1M tokens — Claude Code defaults to $ccm (half the cost of opus); to switch: /model claude-opus-5-5." }
  foreach ($w in $st.Warn) { Write-Host "Внимание: $w" -ForegroundColor Yellow }
} catch {
  $msg = "$($_.Exception.Message)"
  Say ''
  if ($msg.StartsWith('TWSTOP:')) { Write-Host ('ОШИБКА: ' + $msg.Substring(7)) -ForegroundColor Red }
  else { Write-Host "ОШИБКА: $msg" -ForegroundColor Red; Say 'Пришлите снимок этого окна в чат заказа.' }
} finally {
  if ($qe) { try { [void][TokenWave.TwCon]::SetConsoleMode($qe.H, $qe.M) } catch { } }
  Remove-Item Env:TW_KEY, Env:TW_APP, Env:TW_PATCH, Env:TW_MODEL -ErrorAction SilentlyContinue
}
}
