module.exports = {
  name: "Give Reputation (via GUI)",
  section: "# SHDZ - Reputation",

  meta: {
    version: "2.1.7",
    preciseCheck: false,
    author: "Hit Stary & vxed_",
  },

  subtitle(data) {
    return `${data.repType === "plus" ? "+Rep" : "-Rep"} dla ${data.targetUser}`;
  },

  fields: ["targetUser", "repType", "reason", "storage", "varName", "errorStorage", "errorVarName"],

  html() {
    return `
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

