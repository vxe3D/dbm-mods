module.exports = {
  name: "Give Reputation (via GUI)",
  section: "# VX - Reputation",
  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: true,
    author: "Hit stary & vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    return `${data.repType === "plus" ? "+Rep" : "-Rep"} dla ${data.targetUser}`;
  },

  fields: ["targetUser", "repType", "reason", "storage", "varName", "errorStorage", "errorVarName"],

  html() {
    return `
      <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
        <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">Hit stary</span> <span class="vcstatus-author-label">&</span> <span class="vcstatus-editor-name">vxed_</span></div>
        <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
      </div>
      <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
        <span class="vcstatus-version">v3.4.0</span>
      </div>
      <style>
        .vcstatus-author-label {
          color: #BDBDBD;
        }
        .vcstatus-author-name {
          color: #008f13ff;
        }
        .vcstatus-editor-name {
          color: #9040d1ff;
        }
        :root {
          --vcstatus-box-width: 64px;
          --vcstatus-box-height: 28px;
          --vcstatus-box-left-width: 175px;
          --vcstatus-box-left-height: 58px;
          --vcstatus-author-font-size: 14px;
          --vcstatus-discord-font-size: 14px;
          --vcstatus-author-margin-top: 0px;
          --vcstatus-discord-margin-top: -2px;
          --vcstatus-box-left-offset: 6px;
          --vcstatus-author-margin-left: 2px;
          --vcstatus-discord-margin-left: 40px;
        }
        .vcstatus-box-fixed {position:fixed;top:2px;z-index:9999;padding:5px 8px;border-radius:10px;font-size:14px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.10);border:1px solid #23272a;background:linear-gradient(90deg,#23243a 0%,#3a3b5a 100%);color:#fff;min-width:120px;max-width:320px;display:flex;flex-direction:column;margin-top:5px;align-items:flex-start;gap:4px;}
        .vcstatus-box-right {right:18px;justify-content:center;color:#ff4d4d;align-items:center;flex-direction:row;width:var(--vcstatus-box-width);min-width:var(--vcstatus-box-width);max-width:var(--vcstatus-box-width);padding:0;flex-shrink:0;font-size:16px;height:var(--vcstatus-box-height);margin-top:-0.5px;box-sizing:border-box;overflow:hidden;}
        .vcstatus-version {color:#9040d1ff;font-weight:bold;font-size:18px;margin:0;padding:0;line-height:1;letter-spacing:0;white-space:nowrap;min-width:0;max-width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;}
        .vcstatus-box-left {left:var(--vcstatus-box-left-offset);width:var(--vcstatus-box-left-width);min-width:var(--vcstatus-box-left-width);max-width:var(--vcstatus-box-left-width);height:var(--vcstatus-box-left-height);}
        .vcstatus-author {color:#ff4d4d;font-weight:bold;font-size:var(--vcstatus-author-font-size);margin-bottom:2px;margin-top:var(--vcstatus-author-margin-top);margin-left:var(--vcstatus-author-margin-left);}
        .vcstatus-discord {color:#5865F2;background:#23272a;border-radius:5px;padding:2px 10px;text-decoration:none;font-weight:bold;font-size:var(--vcstatus-discord-font-size);margin-top:var(--vcstatus-discord-margin-top);margin-left:var(--vcstatus-discord-margin-left);transition:background 0.2s,color 0.2s;box-shadow:0 1px 4px rgba(88,101,242,0.08);}
        .vcstatus-discord:hover {background:#5865F2;color:#fff;text-decoration:underline;}
        .vcstatus-warning {background:linear-gradient(90deg,#4a3252ff 0%,#885697ff 100%);border:1px solid #140e16ff;color:#222;padding:10px 14px;border-radius:8px;margin-bottom:16px;font-size:13px;box-shadow:0 2px 8px rgba(255,85,85,0.08);margin-top:5px;}
        .dbminputlabel {color:#8754ffff;font-weight:bold;}
        input.round {border-radius:6px;border:1px solid #aaa;padding:6px 10px;font-size:14px;background:#21232B;transition:border-color 0.2s;}
        input.round:focus {border-color:#b595ffff;outline:none;}
      </style>

      <div style="padding: 5px;">
        <span class="dbminputlabel">ID lub @użytkownika (np. 123456 lub <@123456>)</span><br>
        <input id="targetUser" class="round" type="text"><br>

        <span class="dbminputlabel">Typ reputacji</span>
        <select id="repType" class="round">
          <option value="plus" selected>👍 +Rep</option>
          <option value="minus">👎 -Rep</option>
        </select><br>

        <span class="dbminputlabel">Powód</span>
        <textarea id="reason" rows="4" placeholder="Za co dajesz reputację?" class="round" style="width: 100%; resize: none;"></textarea>
        <br><br>
        <store-in-variable dropdownLabel="Invalid userid/reason" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
        <br><br><br>
        <store-in-variable dropdownLabel="Self-rep blocked" selectId="errorStorage" variableContainerId="errorVarNameContainer" variableInputId="errorVarName"></store-in-variable>
      </div>
    `;
  },

  async action(cache) {

    const data = cache.actions[cache.index];
    const storage = data.storage;
    const varName = this.evalMessage(data.varName, cache);
    const errorStorage = data.errorStorage;
    const errorVarName = this.evalMessage(data.errorVarName, cache);
    const userInput = this.evalMessage(data.targetUser, cache);
    const repType = data.repType === "plus" ? "+" : "-";
    const reason = this.evalMessage(data.reason, cache);
    const sqlite3 = require("sqlite3").verbose();
    const path = require("path");
    const fs = require("fs");

    // Detekcja wersji discord.js
    const discordVersion = (() => {
      try {
        const djs = require("discord.js");
        return djs.version || "13.0.0";
      } catch (e) {
        console.log(`[SHDZ-REP] Nie udało się wykryć wersji discord.js:`, e);
        return "13.0.0";
      }
    })();
    const isV14 = parseInt(discordVersion.split(".")[0], 10) >= 14;

    const match = userInput.match(/\d{15,}/);
    const userId = match ? match[0] : null;
    const senderId = cache.getUser()?.id || "system";


    if (!userId) {
      console.error("❌ Nieprawidłowe ID/użytkownik.");
      if (errorStorage && errorVarName) {
        const storageType = parseInt(errorStorage, 10);
        console.log(`[SHDZ-REP] [userId error] Przypisuję 'userId' do storage=${storageType}, varName='${errorVarName}'`);
        this.storeValue("userId", storageType, errorVarName, cache);
        console.log(`[SHDZ-REP] SelfRepBlockedVar: zapisuję do storage=${storageType}, varName='${errorVarName}' wartość: false (błędny userId)`);
        this.storeValue(false, storageType, errorVarName, cache);
      }
      return this.callNextAction(cache);
    }

    if (!reason) {
      console.error("❌ Musisz podać powód.");
      if (errorStorage && errorVarName) {
        const storageType = parseInt(errorStorage, 10);
        console.log(`[SHDZ-REP] [reason error] Przypisuję 'reason' do storage=${storageType}, varName='${errorVarName}'`);
        this.storeValue("reason", storageType, errorVarName, cache);
        console.log(`[SHDZ-REP] SelfRepBlockedVar: zapisuję do storage=${storageType}, varName='${errorVarName}' wartość: false (brak powodu)`);
        this.storeValue(false, storageType, errorVarName, cache);
      }
      return this.callNextAction(cache);
    }

    // Blokada nadawania reputacji samemu sobie
    if (userId === senderId) {
      const target = cache.interaction ?? cache.msg;
      if (target?.reply) {
        const replyOptions = {
          content: `❌ Nie możesz nadawać reputacji sam sobie!`
        };
        let logMode = "none";
        if (cache.interaction) {
          if (isV14) {
            replyOptions.flags = 64;
            logMode = "flags (v14)";
          } else {
            replyOptions.ephemeral = true;
            logMode = "ephemeral (v13)";
          }
        }
        console.log(`[SHDZ-REP] discord.js version: ${discordVersion}, reply mode: ${logMode}`);
        await target.reply(replyOptions);
      }
      // Nie zapisuj nic do zmiennej 'invalid' (storage/varName) przy self-rep
      if (errorStorage && errorVarName) {
        const storageType = parseInt(errorStorage, 10);
        console.log(`[SHDZ-REP] SelfRepBlockedVar: zapisuję do storage=${storageType}, varName='${errorVarName}' wartość: true`);
        this.storeValue(true, storageType, errorVarName, cache);
      }
      return this.callNextAction(cache);
    }

    // Przygotuj bazę i katalog
    const dbDir = path.join(process.cwd(), "Database");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.join(dbDir, "reputation.sqlite");
    const db = new sqlite3.Database(dbPath);

    // Tworzenie tabeli jeśli nie istnieje
    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE IF NOT EXISTS reputations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          [from] TEXT NOT NULL,
          type TEXT NOT NULL,
          timestamp INTEGER NOT NULL,
          reason TEXT
        )`,
        (err) => (err ? reject(err) : resolve())
      );
    });

    // Dodaj wpis do bazy
    await new Promise((resolve, reject) => {
      // Zapisuj timestamp jako <t:UNIX:f>
      const unix = Math.floor(Date.now() / 1000);
      db.run(
        `INSERT INTO reputations (user_id, [from], type, timestamp, reason) VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          cache.getUser()?.id || "system",
          repType,
          `<t:${unix}:f>`,
          reason
        ],
        (err) => (err ? reject(err) : resolve())
      );
    });

    db.close();
    console.log(`✅ Zapisano ${repType}Rep dla ${userId}: ${reason}`);
    if (storage && varName) {
      const storageType = parseInt(storage, 10);
      console.log(`[SHDZ-REP] [success] Przypisuję false do storage=${storageType}, varName='${varName}'`);
      this.storeValue(false, storageType, varName, cache);
    }
    if (errorStorage && errorVarName) {
      const storageType = parseInt(errorStorage, 10);
      console.log(`[SHDZ-REP] SelfRepBlockedVar: zapisuję do storage=${storageType}, varName='${errorVarName}' wartość: false`);
      this.storeValue(false, storageType, errorVarName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};

