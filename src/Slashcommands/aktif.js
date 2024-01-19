const { SlashCommandBuilder, hyperlink  } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const moment = require("moment");
const config = require("../configs/settings.json");
const emojis = require("../configs/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aktif")
     .setDescription("Sunucunun Aktif olduğunu belirtir."),
  async execute(interaction, client) {
    if (!interaction.member.roles.cache.some(role => [config.founderperm, config.developerperm].includes(role.id))) {
      return interaction.reply({ content: `${emojis.red} Yönetimde olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    }
  
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setURL(config.server.cfxip)
      .setLabel(`💻 Fivem'e Bağlan`)
      .setStyle('LINK')
    );
   
    await interaction.reply({ components: [row], embeds: [new 
      MessageEmbed()
      .setImage('https://cdn.discordapp.com/attachments/1152518957639675935/1180186473010569236/GalaxyDiscordBanner.png')
      .setFooter(config.footerText)
      .setColor(config.embedrenk)
      .setDescription(`__**${config.server.sunucuadi}**__ : ➥ ***Aktif***\n\nSunucu aktiftir, giriş yapabilirsiniz giriş yapmak için aşağıda ki butonu kullanabilirsiniz. İyi roller dileriz.\n\nSunucu IP Adresi: ${config.server.ipadresi}`)]})
    await interaction.channel.send("@everyone")
 }
};
