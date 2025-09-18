const fs = require("fs");
const path = require("path");

// Ścieżka do versions.json
const versionsPath = path.join(__dirname, "versions.json");

// Wczytaj istniejący plik lub pusty obiekt
const data = fs.existsSync(versionsPath)
  ? JSON.parse(fs.readFileSync(versionsPath, "utf8"))
  : {};

const now = new Date().toISOString().replace("T", " ").slice(0, 16);

// Pobierz pliki .js z katalogu głównego repo (bez /Versions)
const repoRoot = path.join(__dirname, "..");
const files = fs
  .readdirSync(repoRoot)
  .filter(
    (file) =>
      file.endsWith(".js") &&
      !file.startsWith("Versions")
  );

// Aktualizacja versions.json
files.forEach((file) => {
  const filePath = path.join(repoRoot, file);
  const content = fs.readFileSync(filePath, "utf8");

  const versionMatch = content.match(/actionVersion:\s*["']([\d.]+)["']/);
  const actionVersion = versionMatch ? versionMatch[1] : "1.0.0";

  const authorMatch = content.match(/author:\s*["']([^"']+)["']/);
  const author = authorMatch ? authorMatch[1] : "unknown";

  if (!data[file]) {
    // Nowy plik
    data[file] = {
      version: actionVersion,
      author: author,
      createdDate: now,
      updateDate: "undefined",
    };
  } else {
    const prev = data[file];
    if (prev.version !== actionVersion || prev.author !== author) {
      prev.updateDate = now; // tylko gdy faktycznie coś się zmieniło
    }
    prev.version = actionVersion;
    prev.author = author;
  }
});

// Usuń pliki, których już nie ma
Object.keys(data).forEach((key) => {
  if (!files.includes(key)) {
    console.log(`🗑 Usuwam wpis dla pliku: ${key}`);
    delete data[key];
  }
});

// Zapisz
fs.writeFileSync(versionsPath, JSON.stringify(data, null, 2));
console.log("✅ versions.json updated!");
