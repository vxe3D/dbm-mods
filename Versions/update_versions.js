const fs = require("fs");
const path = require("path");

// Ścieżka do versions.json
const versionsPath = path.join(__dirname, "versions.json");

// Wczytaj istniejący plik lub pusty obiekt
const data = fs.existsSync(versionsPath)
  ? JSON.parse(fs.readFileSync(versionsPath, "utf8"))
  : {};

const now = new Date().toISOString().replace("T", " ").slice(0, 16);

// Repo root
const repoRoot = path.join(__dirname, "..");

// Funkcja do pobrania wszystkich plików .js z folderów actions i events
function getFilesFromDirs(dirs) {
  let files = [];
  dirs.forEach((dirName) => {
    const dirPath = path.join(repoRoot, dirName);
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => {
        if (file.endsWith(".js")) {
          files.push({ fullPath: `${dirName}/${file}`, displayName: file });
        }
      });
    }
  });
  return files;
}

// Pobieramy pliki tylko z actions i events
const files = getFilesFromDirs(["actions", "events"]);

// Aktualizacja versions.json (z krótką nazwą pliku)
files.forEach(({ fullPath, displayName }) => {
  const filePath = path.join(repoRoot, fullPath);
  const content = fs.readFileSync(filePath, "utf8");

  const versionMatch = content.match(/actionVersion:\s*["']([\d.]+)["']/);
  const actionVersion = versionMatch ? versionMatch[1] : "1.0.0";

  const authorMatch = content.match(/author:\s*["']([^"']+)["']/);
  const author = authorMatch ? authorMatch[1] : "unknown";

  if (!data[displayName]) {
    // Nowy plik
    data[displayName] = {
      version: actionVersion,
      author: author,
      createdDate: now,
      updateDate: "undefined",
    };
  } else {
    const prev = data[displayName];
    if (prev.version !== actionVersion || prev.author !== author) {
      prev.updateDate = now; // tylko gdy coś się zmieniło
    }
    prev.version = actionVersion;
    prev.author = author;
  }
});

// Usuń wpisy plików, których już nie ma
Object.keys(data).forEach((key) => {
  if (!files.some(f => f.displayName === key)) {
    console.log(`🗑 Usuwam wpis dla pliku: ${key}`);
    delete data[key];
  }
});

// Zapisz versions.json
fs.writeFileSync(versionsPath, JSON.stringify(data, null, 2));
console.log("✅ versions.json updated!");

// -------------------- GENEROWANIE README --------------------
const readmePath = path.join(repoRoot, "README.md");
let readmeContent = fs.existsSync(readmePath)
  ? fs.readFileSync(readmePath, "utf8")
  : "# DBM Mods\n\n## Lista akcji\n\n";

// Tabela z nagłówkami
const tableHeader = `| Plik | Wersja | Autor | Utworzono | Zaktualizowano | Pobierz |
|------|--------|-------|-----------|----------------|---------|
`;

const repoRawUrl = "https://github.com/vxe3D/dbm-mods/raw/main/";

let tableRows = "";
files.forEach(({ fullPath, displayName }) => {
  const v = data[displayName];
  // Zwykły link do raw, użytkownik pobiera manualnie
  const downloadLink = `[🔗](${repoRawUrl}${encodeURIComponent(fullPath.replace(/\\/g, "/"))})`;
  tableRows += `| <small>${displayName}</small> | <small>${v.version}</small> | <small>${v.author}</small> | <small>${v.createdDate}</small> | <small>${v.updateDate}</small> | ${downloadLink} |\n`;
});

// Wstawienie tabeli między markerami w README
if (readmeContent.includes("<!-- ACTIONS_TABLE_START -->")) {
  readmeContent = readmeContent.replace(
    /<!-- ACTIONS_TABLE_START -->[\s\S]*<!-- ACTIONS_TABLE_END -->/m,
    `<!-- ACTIONS_TABLE_START -->\n${tableHeader}${tableRows}<!-- ACTIONS_TABLE_END -->`
  );
} else {
  // Jeśli markerów brak, dopisujemy na końcu
  readmeContent += `\n## Lista akcji\n<!-- ACTIONS_TABLE_START -->\n${tableHeader}${tableRows}<!-- ACTIONS_TABLE_END -->\n`;
}

// Zapis do README.md
fs.writeFileSync(readmePath, readmeContent);
console.log("✅ README.md updated with versions table!");
