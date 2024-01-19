const { Client, Collection, Intents , MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js");

const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
}); 

const config = require("./src/configs/settings.json");
const fs = require("fs");
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} adet komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      let props = require(`./src/commands/` + f);
      console.log(`${props.conf.name} komutu yüklendi!`);
      client.commands.set(props.conf.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.conf.name);
      });
    })
  })
});

require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(config.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });

  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync("./src/Slashcommands/").forEach((file) => {
    const command = require(`./src/Slashcommands/${file}`);
    client.slashcommands.set(command.data.name, command);
    slashcommands.push(command.data.toJSON());
  });
  
  const rest = new REST({ version: '9' }).setToken(config.token);
  (async () => {
    try {
      console.log('Slash Komutları yükleniyor..');
      await rest.put(
        Routes.applicationCommands(config.BotClientID),
        { body: slashcommands },
      );
      console.log('Slash komutları başarıyla yüklendi.');
    } catch (error) {
      console.error(error);
    }
  })();
  

  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName);
    if (!command) return;
    try {
       command.execute(interaction, client);
    } catch (err) {
      if (err) console.error("Error: ", err);
    }
  });