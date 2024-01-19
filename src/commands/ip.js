const { MessageEmbed, MessageActionRow, MessageButton, Discord } = require("discord.js");
const config = require('../configs/settings.json')

module.exports = {
    conf: {
      aliases: [],
      name: "ip",
      help: "ip"
    },
  
run: async (client, message, args, embed, prefix) => {
    const buttonSatır = new MessageActionRow()
    .addComponents(
            new MessageButton()
            .setURL(config.server.cfxip)
            .setLabel(`💻 Sunucuya Bağlan`)
            .setStyle('LINK'),
  );
  await message.channel.send({components: [buttonSatır] ,embeds: [
    new MessageEmbed().setFooter(config.footerText)
    .setDescription(`**IP:** ***${config.server.SERVER_IP}***`)
    .setColor(Config.embedrenk)]})
}
}
