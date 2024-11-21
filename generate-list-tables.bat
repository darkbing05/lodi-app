@echo off
echo Extracting table definitions...
npx ts-node -O "{\"skipProject\": true}" -e "import fs from 'fs'; const supabaseTs = fs.readFileSync('src/types/supabase.ts', 'utf8'); const tablesRegex = /Tables:\s*\{([^}]+)\}/; const match = supabaseTs.match(tablesRegex); if (match) { const tables = match[1]; const formattedTables = tables.replace(/Row:\s*\{([^}]+)\}/g, (match, p1) => `{\n${p1.split('\n').map(line => '  ' + line).join('\n')}\n}`); fs.writeFileSync('src/types/index.ts', formattedTables, 'utf8'); } else { console.error('No table definitions found in supabase.ts'); }"
echo Done.
