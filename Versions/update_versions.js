const fs = require('fs');
const path = require('path');

// Funkcja do rekurencyjnego przeszukiwania katalogów
function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath, filelist);
    } else if (file.endsWith('.js')) {
      // Ścieżka względem głównego katalogu repo
      filelist.push(path.relative('.', fullPath));
    }
  });
  return filelist;
}

// Funkcja do pobrania actionVersion z pliku .js
function getActionVersion(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/actionVersion\s*:\s*["']([\d.]+)["']/);
    if (match) return match[1];
  } catch (err) {
    console.warn(`Nie można odczytać pliku ${filePath}: ${err.message}`);
  }
  return '1.0.0';
}

// Ścieżka do folderu skryptu
const scriptDir = __dirname;

// Plik versions.json w tym samym katalogu co skrypt
const versionsPath = path.join(scriptDir, 'versions.json');

let data = {};
if (fs.existsSync(versionsPath)) {
  data = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
}

// Pobranie wszystkich plików .js w repo
const files = walkSync('.');

// Aktualna data w formacie YYYY-MM-DD HH:MM
const now = new Date().toISOString().replace('T', ' ').slice(0,16);

// Aktualizacja danych w JSON
files.forEach(file => {
  const filePath = path.join('.', file);
  const versionFromFile = getActionVersion(filePath);

  if (!data[file]) {
    data[file] = {
      version: versionFromFile,
      author: 'vxed_',
      createdDate: now,
      updateDate: 'undefined'
    };
  } else {
    data[file].updateDate = now;
    data[file].version = versionFromFile;
  }
});

// Zapisanie JSON z wcięciami 2 spacji
fs.writeFileSync(versionsPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`versions.json zaktualizowany w katalogu ${scriptDir}`);
