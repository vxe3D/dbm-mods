const fs = require("fs");
const path = require("path");

// Ścieżka do versions.json (w tym samym katalogu co ten plik)
const versionsPath = path.join(__dirname, "versions.json");

// Wczytaj istniejący plik lub utwórz pusty obiekt
const data = fs.existsSync(versionsPath)
  ? JSON.parse(fs.readFileSync(versionsPath, "utf8"))
  : {};

const now = new Date().toISOString().replace("T", " ").slice(0, 16);

// Pobieramy tylko pliki .js z głównego katalogu repo (nie z /Versions)
const repoRoot = path.join(__dirname, "..");
const files = fs
  .readdirSync(repoRoot)
  .filter(
    (file) =>
      file.endsWith(".js") && // tylko pliki .js
      !file.startsWith("Versions") // pomijamy folder Versions
  );

// Aktualizacja danych w versions.json
files.forEach((file) => {
  const filePath = path.join(repoRoot, file);
  const content = fs.readFileSync(filePath, "utf8");

  // Wyciągamy actionVersion z meta
  const versionMatch = content.match(/actionVersion:\s*["']([\d.]+)["']/);
  const actionVersion = versionMatch ? versionMatch[1] : "1.0.0";

  // Wyciągamy author z meta
  const authorMatch = content.match(/author:\s*["']([^"']+)["']/);
  const author = authorMatch ? authorMatch[1] : "unknown";

  if (!data[file]) {
    // jeśli nie istnieje w versions.json -> dodaj nowy wpis
    data[file] = {
      version: actionVersion,
      author: author,
      createdDate: now,
      updateDate: "undefined",
    };
  } else {
    // jeśli istnieje -> zaktualizuj updateDate, version i author
    data[file].updateDate = now;
    data[file].version = actionVersion;
    data[file].author = author;
  }
});

// Usuwanie wpisów, których pliki już nie istnieją
Object.keys(data).forEach((key) => {
  if (!files.includes(key)) {
    console.log(`🗑 Usuwam wpis dla pliku: ${key}`);
    delete data[key];
  }
});

// Zapisujemy plik
fs.writeFileSync(versionsPath, JSON.stringify(data, null, 2));
console.log("✅ versions.json updated!");
