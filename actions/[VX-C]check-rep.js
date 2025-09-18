

module.exports = {
  name: "Check Reputation (with Pages)",
  section: "# VX - Reputation",
  meta: {
    version: "3.2.0",
    actionVersion: "3.4.0",
    preciseCheck: false,
    author: "Hit stary & vxed_",
    authorUrl: "https://github.com/vxe3D/dbm-mods",
    downloadUrl: "https://github.com/vxe3D/dbm-mods",
  },

  subtitle(data) {
    return `Sprawdź reputację: ${data.targetUser}`;
  },

  fields: ["targetUser"],

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

      <div style="padding: 15px;">
        <span class="dbminputlabel">ID lub @użytkownika do sprawdzenia:</span><br>
        <input id="targetUser" class="round" type="text" placeholder="1234567890 lub <@1234567890>">
      </div>
    `;
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const input = this.evalMessage(data.targetUser, cache);
    const match = input.match(/\d{15,}/);
    const userId = match ? match[0] : null;
    const sqlite3 = require("sqlite3").verbose();
    const path = require("path");
    const djs = require("discord.js");
    let MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle;
    const discordVersion = djs.version || "13.0.0";
    const isV14 = parseInt(discordVersion.split(".")[0], 10) >= 14;
    if (isV14) {
      EmbedBuilder = djs.EmbedBuilder;
      ActionRowBuilder = djs.ActionRowBuilder;
      ButtonBuilder = djs.ButtonBuilder;
      ButtonStyle = djs.ButtonStyle;
    } else {
      MessageEmbed = djs.MessageEmbed;
      MessageActionRow = djs.MessageActionRow;
      MessageButton = djs.MessageButton;
    }

    if (!userId) {
      console.error("❌ Nieprawidłowe ID/użytkownik.");
      return this.callNextAction(cache);
    }


    // Inicjalizacja bazy w katalogu Database
    const dbDir = path.join(process.cwd(), "Database");
    const fs = require("fs");
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

    // Pobierz reputacje użytkownika
    const userReps = await new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM reputations WHERE user_id = ? ORDER BY timestamp DESC`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    if (!userReps || userReps.length === 0) {
      const target = cache.interaction ?? cache.msg;
      if (target?.reply) {
        const replyOptions = {
          content: `❌ Brak reputacji dla <@${userId}>`
        };
        const isInteraction = cache.interaction && (
          typeof cache.interaction.isCommand === "function" && cache.interaction.isCommand() ||
          typeof cache.interaction.isChatInputCommand === "function" && cache.interaction.isChatInputCommand() ||
          typeof cache.interaction.isContextMenuCommand === "function" && cache.interaction.isContextMenuCommand()
        );
        let logMode = "none";
        if (isInteraction) {
          if (isV14) {
            replyOptions.flags = 64;
            if ("ephemeral" in replyOptions) delete replyOptions.ephemeral;
          } else {
            replyOptions.ephemeral = true;
          }
        }
        await target.reply(replyOptions);
      }
      db.close();
      return this.callNextAction(cache);
    }

    const client = this.getDBM().Bot.bot;
    const pageSize = 15;
    let currentPage = 0;
    
    const targetUser = await client.users.fetch(userId).catch(() => null);
    
    const getPageEmbed = async (page) => {
      const start = page * pageSize;
      const pageReps = userReps.slice(start, start + pageSize);
      let embed;
      if (isV14) {
        embed = new EmbedBuilder()
          .setTitle(`📊 Reputacja dla ${targetUser?.tag || `<@${userId}>`}`)
          .setColor(0x00AAFF)
          .setFooter({ text: `Strona ${page + 1} z ${Math.ceil(userReps.length / pageSize)}` })
          .setTimestamp();
      } else {
        embed = new MessageEmbed()
          .setTitle(`📊 Reputacja dla ${targetUser?.tag || `<@${userId}>`}`)
          .setColor("#00AAFF")
          .setFooter({ text: `Strona ${page + 1} z ${Math.ceil(userReps.length / pageSize)}` })
          .setTimestamp();
      }

      for (const rep of pageReps) {
        // Wyświetlaj <@id> jako osobny wiersz w value, bo Discord nie renderuje mentionów w polu name
        let fromDisplayName = `<@${rep.from}>`;

        // Odczytaj timestamp w formacie <t:UNIX:f> lub liczbowym
        let ts = rep.timestamp;
        let tsDisplay;
        if (typeof ts === "string" && ts.startsWith("<t:")) {
          tsDisplay = ts;
        } else {
          // Jeśli liczba (ms lub s), konwertuj na <t:UNIX:f>
          let unix = Number(ts);
          if (unix > 1000000000000) unix = Math.floor(unix / 1000); // ms -> s
          tsDisplay = `<t:${unix}:f>`;
        }

        const fieldName = `ㅤ`;
        const fieldValue = `${rep.type === "+" ? "👍" : "👎"} Od: ${fromDisplayName}\n📅 ${tsDisplay}\n💬 ${rep.reason}`;
        if (isV14) {
          embed.addFields({ name: fieldName, value: fieldValue, inline: false });
        } else {
          embed.addField(fieldName, fieldValue, false);
        }
      }

      return embed;
    };

    const createButtons = (page) => {
      const maxPage = Math.ceil(userReps.length / pageSize) - 1;
      if (isV14) {
        return new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("prev_page")
            .setLabel("⬅️")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === 0),
          new ButtonBuilder()
            .setCustomId("next_page")
            .setLabel("➡️")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === maxPage)
        );
      } else {
        return new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("prev_page")
            .setLabel("⬅️")
            .setStyle("PRIMARY")
            .setDisabled(page === 0),
          new MessageButton()
            .setCustomId("next_page")
            .setLabel("➡️")
            .setStyle("PRIMARY")
            .setDisabled(page === maxPage)
        );
      }
    };

    const target = cache.interaction ?? cache.msg;
    const sender = cache.interaction?.user ?? cache.msg?.author;

    // Ustaw allowedMentions zależnie od wersji
    let allowedMentions;
    if (isV14) {
      allowedMentions = { parse: [] };
    } else {
      allowedMentions = { users: [] };
    }
    const replyPayload = {
      embeds: [await getPageEmbed(currentPage)],
      components: [createButtons(currentPage)],
      allowedMentions
    };

    let sentMessage;
    if (cache.interaction?.reply) {
      await cache.interaction.reply(replyPayload);
      sentMessage = await cache.interaction.fetchReply();
    } else if (cache.msg?.channel) {
      sentMessage = await cache.msg.channel.send(replyPayload);
    } else {
      console.error("❌ Nie znaleziono kanału ani interakcji.");
      return this.callNextAction(cache);
    }

    const collector = sentMessage.createMessageComponentCollector({
      time: 60000, // Czas życia kolektora (1 minuta)
      filter: (i) => i.user.id === sender.id, 
    });

    collector.on("collect", async (i) => {

      if (i.customId === "prev_page" && currentPage > 0) currentPage--;
      if (i.customId === "next_page" && (currentPage + 1) * pageSize < userReps.length) currentPage++;

      try {
        await sentMessage.edit({
          embeds: [await getPageEmbed(currentPage)],
          components: [createButtons(currentPage)],
        });
      } catch (error) {
        if (error.code === 10008) { 
          console.error("❌ Błąd: Oryginalna wiadomość została usunięta.");
        } else {
          console.error("❌ Błąd podczas edycji wiadomości paginacji:", error);
        }
      }
    });

    collector.on("end", () => {
      // Po zakończeniu kolektora (np. po 60 sekundach), usuwamy przyciski.
      try {
        if (sentMessage && sentMessage.editable) { 
          sentMessage.edit({ components: [] }).catch(e => console.error("Błąd podczas usuwania komponentów:", e));
        }
      } catch (e) {
        console.error("Błąd podczas kończenia kolektora:", e);
      }
    });

    db.close();
    this.callNextAction(cache);
  },

  mod() {},
};