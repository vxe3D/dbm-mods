const fs = require("fs");
const path = require("path");

function getWarsawTime() {
  return new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", "");
}

const versionsPath = path.join(__dirname, "versions.json");

const data = fs.existsSync(versionsPath)
  ? JSON.parse(fs.readFileSync(versionsPath, "utf8"))
  : {};

console.log("📂 Wczytane wersje z versions.json:", data);

const repoRoot = path.join(__dirname, "..");

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

const files = getFilesFromDirs(["actions", "events"]);
console.log("📄 Pliki znalezione w repo:", files);

// Aktualizacja wersji i autorów
files.forEach(({ fullPath, displayName }) => {
  const filePath = path.join(repoRoot, fullPath);
  const content = fs.readFileSync(filePath, "utf8");

  const versionMatch = content.match(/actionVersion:\s*["']([\d.]+)["']/);
  const actionVersion = versionMatch ? versionMatch[1] : "1.0.0";

  const authorMatch = content.match(/author:\s*["']([^"']+)["']/);
  const author = authorMatch ? authorMatch[1] : "unknown";

  if (!data[displayName]) {
    data[displayName] = {
      version: actionVersion,
      author: author,
      createdDate: getWarsawTime(),
      updateDate: "undefined",
    };
  } else {
    const prev = data[displayName];
    if (prev.version !== actionVersion || prev.author !== author) {
      prev.updateDate = getWarsawTime();
      console.log(`✏️ Zaktualizowano plik: ${displayName}, updateDate ustawione na ${prev.updateDate}`);
    }
    prev.version = actionVersion;
    prev.author = author;
  }
});

// Usuwanie wpisów dla nieistniejących plików
Object.keys(data).forEach((key) => {
  if (!files.some(f => f.displayName === key)) {
    console.log(`🗑 Usuwam wpis dla pliku: ${key}`);
    delete data[key];
  }
});

fs.writeFileSync(versionsPath, JSON.stringify(data, null, 2));
console.log("✅ versions.json updated!");

// -------------------- GENEROWANIE README --------------------
const readmePath = path.join(repoRoot, "README.md");
let readmeContent = fs.existsSync(readmePath)
  ? fs.readFileSync(readmePath, "utf8")
  : "# DBM V14 Mods\n\n## Actions & Events\n\n";

const repoRawUrl = "https://github.com/vxe3D/dbm-mods/blob/main/";

function parsePolishDate(str) {
  if (!str || str === "undefined") return null;
  const [day, month, year, hour, minute] = str.match(/(\d+)/g).map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

function generateRowsWithLatest(prefix) {
  const arr = files.filter(f => f.fullPath.startsWith(prefix));

  const sorted = [...arr].sort((a, b) => {
    const va = data[a.displayName];
    const vb = data[b.displayName];
    const getTime = v => {
      const d = parsePolishDate(v.updateDate) || parsePolishDate(v.createdDate);
      return d ? d.getTime() : 0;
    };
    return getTime(vb) - getTime(va);
  });

  const latest = sorted.slice(0, 5);
  const rest = sorted.slice(5);

  const renderRows = arr => arr.map(({ fullPath, displayName }) => {
    const v = data[displayName];
    const fileUrl = `${repoRawUrl}${encodeURIComponent(fullPath.replace(/\\/g, "/"))}`;
    let display = displayName.replace(/^\[.*?\]/, "");
    if (display.length > 30) display = display.slice(0,16) + "...";
    const updateDate = v.updateDate && v.updateDate !== "undefined" ? v.updateDate : "Awaiting update";
    const displayLink = `[${display}](${fileUrl})`;
    return `| ${displayLink} | ${v.version} | ${v.author} | ${v.createdDate} | ${updateDate} |`;
  }).join("\n");

  return {
    latestRows: renderRows(latest),
    otherRows: renderRows(rest)
  };
}

const { latestRows: latestActions, otherRows: otherActions } = generateRowsWithLatest("actions/");
const { latestRows: latestEvents, otherRows: otherEvents } = generateRowsWithLatest("events/");

const markdownTables = `
| Downloader |
|------|
[⬇️ Click me!](https://vxe3D.github.io/dbm-mods/Versions/download.html)

<h3><img src="https://i.imgur.com/tctsqRS.png" width="16" height="16"> Latest Actions</h3>

| File | Version | Author | Created | Updated |
|------|--------|-------|-----------|----------------|
${latestActions}

<h3><img src="https://i.imgur.com/tctsqRS.png" width="16" height="16"> Other Actions</h3>

| File | Version | Author | Created | Updated |
|------|--------|-------|-----------|----------------|
${otherActions}

<h3><img src="https://i.imgur.com/ezqaGtk.png" width="16" height="16"> Latest Events</h3>

| File | Version | Author | Created | Updated |
|------|--------|-------|-----------|----------------|
${latestEvents}

<h3><img src="https://i.imgur.com/ezqaGtk.png" width="16" height="16"> Other Events</h3>

| File | Version | Author | Created | Updated |
|------|--------|-------|-----------|----------------|
${otherEvents}
`;

if (readmeContent.includes("<!-- ACTIONS_TABLE_START -->")) {
  readmeContent = readmeContent.replace(
    /<!-- ACTIONS_TABLE_START -->[\s\S]*<!-- ACTIONS_TABLE_END -->/m,
    `<!-- ACTIONS_TABLE_START -->\n${markdownTables}\n<!-- ACTIONS_TABLE_END -->`
  );
} else {
  readmeContent += `\n## Actions & Events\n<!-- ACTIONS_TABLE_START -->\n${markdownTables}\n<!-- ACTIONS_TABLE_END -->\n`;
}

fs.writeFileSync(readmePath, readmeContent);
console.log("✅ README.md updated with Latest & Other Actions/Events tables!");