@echo off
powershell -Command "Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -notmatch 'node_modules|\.next|\.git|\.vscode|dist|build|coverage|\.(log|env.*|lock)$' } | Select-Object -ExpandProperty FullName | ForEach-Object { $relative = $_.Replace('%cd%', '').Replace('\', '/').TrimStart('/'); $indent = ($relative.Split('/').Length - 1) * '  '; \"$indent- $relative\" } | Set-Content -Path project-structure.md -Encoding utf8"