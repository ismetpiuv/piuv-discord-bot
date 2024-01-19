const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const emojis = require("../configs/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Belirtilen üyeyi sunucudan atar.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Atılacak üyeyi seçin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Atılma sebebini belirtin.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('kullanici');
    const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('Bu komutu kullanma izniniz yok.');
    }

    if (member.id === interaction.client.user.id) {
      return interaction.reply({ content: `**Terbiyesiz herif sen beni nasıl atacaksın ${emojis.uzgun}`, ephemeral: false });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({ content: '**Kendini atamazsın!**', ephemeral: false });
    }

    if (!member.kickable) {
      return interaction.reply('Bu üyeyi atamam.');
    }

    const dmEmbed = new MessageEmbed()
    .setColor('#99FFCC')
    .setTitle(`${interaction.guild.name} Sunucusundan atıldınız!`)
    .setDescription(`**Sebep:** ${reason}\n**Yetkili:** ${interaction.user}`);

    try {
      await member.send({ embeds: [dmEmbed] });
      await member.kick(`${reason} ( ${interaction.user.username} )`);
      await interaction.reply({ content: `${member.user} isimli kişi ${interaction.user} tarafından ***${reason}*** sebebiyle atıldı!`, ephemeral: false });
    } catch (error) {
      console.error('Kick işlemi sırasında bir hata oluştu:', error);
      await interaction.reply('Üyeyi atarken veya DM gönderirken bir hata oluştu.');
    }
  },
};