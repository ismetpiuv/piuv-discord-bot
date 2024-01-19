const { SlashCommandBuilder, hyperlink  } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication } = require("discord.js");
const config = require("../configs/settings.json");
const emojis = require("../configs/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Discord Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!config.developers.includes(interaction.user.id)) {
      return interaction.reply({ content: `${emojis.red}Bu komutu kullanmak için yetkin yok!`, ephemeral: true });
    }
    await interaction.reply({ content: `${emojis.tik} **Bot yeniden başlatılıyor!**`, ephemeral: false })
    client.user.setActivity({ name: "Yeniden başlatılıyorum!", type: "PLAYING" })
    process.exit(0)
  }
};