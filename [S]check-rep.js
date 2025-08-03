

module.exports = {
  name: "Check Reputation (with Pages)",
  section: "# SHDZ - Reputation",

  meta: {
    version: "2.1.7",
    preciseCheck: false,
    author: "Hit Stary & vxed_",
  },

  subtitle(data) {
    return `Sprawdź reputację: ${data.targetUser}`;
  },

  fields: ["targetUser"],

  html() {
    return `
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