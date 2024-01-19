const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
const config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bakım")
    .setDescription("Sunucunun Bakıma girdiğini belirtir.")
    .addStringOption(option =>
      option.setName("sebep")
        .setDescription("Bakım sebebini belirtin.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if(!config.yonetim.includes(interaction.user.id)) {
      return interaction.reply({ content: `${emojis.red} Yönetimde olmadığın için bu komutu kullanamazsın.`, ephemeral: true })
    }
    const sebep = interaction.options.getString("sebep");

    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setImage("https://cdn.discordapp.com/attachments/1152518957639675935/1180186473010569236/GalaxyDiscordBanner.png")
          .setFooter(config.footerText)
          .setColor(config.embedrenk)
          .setDescription(
            `__**${config.server.sunucuadi}**__ ➥ ***Bakımda***\n\n*Sunucumuz* ***${sebep}*** *sebebiyle geçici olarak bakıma alınmıştır.*\n*Bu süreçte yetkili kişileri darlamamanız rica olunur, Anlayışınız için teşekkürler.*`
          ),
      ],
    });
    await interaction.channel.send("@everyone");
  },
};