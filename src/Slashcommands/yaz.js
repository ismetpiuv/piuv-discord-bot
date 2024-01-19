const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yaz')
    .setDescription('Belirli bir mesajı yazdırır.')
    .addStringOption(option =>
      option.setName('mesaj')
        .setDescription('Yazdırılacak mesajı belirtin.')
        .setRequired(true)),
  async execute(interaction) {
    const mesaj = interaction.options.getString('mesaj');
    const config = require("../configs/settings.json"); 

    if (!config.developers.includes(interaction.user.id)) {
      return interaction.reply({ content: `${emojis.red} Bu komutu kullanmak için yetkin yok!`, ephemeral: true });
    }

    await interaction.reply({ content: `${emojis.tik}`, ephemeral: true });
    await interaction.channel.send({ content: mesaj });
  },
};