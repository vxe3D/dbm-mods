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
    }
    prev.version = actionVersion;
    prev.author = author;
  }
});

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
  : "# DBM Mods\n\n## Lista akcji\n\n";

const repoRawUrl = "https://github.com/vxe3D/dbm-mods/blob/main/";

// 🔽 sortujemy tutaj, przed przekazaniem do generateRows
function sortFilesByDate(arr) {
  return arr.sort((a, b) => {
    const va = data[a.displayName];
    const vb = data[b.displayName];

    const da = new Date(va.updateDate !== "undefined" ? va.updateDate : va.createdDate);
    const db = new Date(vb.updateDate !== "undefined" ? vb.updateDate : vb.createdDate);

    return db - da; // najnowszy pierwszy
  });
}

const actionsFiles = sortFilesByDate(files.filter(f => f.fullPath.startsWith("actions/")));
const eventsFiles  = sortFilesByDate(files.filter(f => f.fullPath.startsWith("events/")));

function generateRows(arr) {
  return arr.map(({ fullPath, displayName }) => {
    const v = data[displayName];
    const fileUrl = `${repoRawUrl}${encodeURIComponent(fullPath.replace(/\\/g, "/"))}`;
    let display = displayName.replace(/^\[.*?\]/, "");
    if (display.length > 19) {
      display = display.slice(0, 16) + "...";
    }

    const updateDate = v.updateDate === "undefined" ? "Oczekuje na aktualizację" : v.updateDate;
    const displayLink = `[${display}](${fileUrl})`;

    return `| <small>${displayLink}</small> | <small>${v.version}</small> | <small>${v.author}</small> | <small>${v.createdDate}</small> | <small>${updateDate}</small> |`;
  }).join("\n");
}

const tableHeader = `| Plik | Wersja | Autor | Utworzono | Zaktualizowano
|------|--------|-------|-----------|----------------|`;

const htmlTables = `
<table>
<tr>
  <td>

### Actions
${tableHeader}
${generateRows(actionsFiles)}

  </td>
</tr>
</table>

<table>
<tr>
  <td>

### Events
${tableHeader}
${generateRows(eventsFiles)}

  </td>
</tr>
</table>
`;

if (readmeContent.includes("<!-- ACTIONS_TABLE_START -->")) {
  readmeContent = readmeContent.replace(
    /<!-- ACTIONS_TABLE_START -->[\s\S]*<!-- ACTIONS_TABLE_END -->/m,
    `<!-- ACTIONS_TABLE_START -->\n${htmlTables}\n<!-- ACTIONS_TABLE_END -->`
  );
} else {
  readmeContent += `\n## Lista akcji\n<!-- ACTIONS_TABLE_START -->\n${htmlTables}\n<!-- ACTIONS_TABLE_END -->\n`;
}

fs.writeFileSync(readmePath, readmeContent);
console.log("✅ README.md updated with Actions & Events tables!");
