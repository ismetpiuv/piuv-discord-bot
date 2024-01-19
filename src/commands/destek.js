const config = require("../configs/settings.json");

module.exports = {
    conf: {
      aliases: [],
      name: "destek",
      help: "destek"
},

run: async (client, message, args, embed, prefix) => {
  await message.channel.send(`<@&${config.yetkili}> Destekte bekleyen biri var. <@${message.author.id}>`)}
}