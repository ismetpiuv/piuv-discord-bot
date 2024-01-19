const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("../configs/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Belirtilen üyeyi sunucudan yasaklar.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Banlanacak kullanıcıyı seçin.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Ban sebebini belirtin.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('kullanici');
    const banReason = interaction.options.getString('sebep') || 'Belirtilmedi';

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'Bu komutu kullanma izniniz yok.', ephemeral: true });
    }

    if (!targetUser) {
      return interaction.reply({ content: 'Banlanacak bir kullanıcı belirtmelisiniz.', ephemeral: true });
    }

    if (targetUser.id === interaction.client.user.id) {
      return interaction.reply({ content: `**Kalpsiz insan sen beni nasıl banlayacaksın ${emojis.uzgun}`, ephemeral: false });
    }

    if (targetUser.id === interaction.user.id) {
      return interaction.reply({ content: '**Kendini banlayamazsın!**', ephemeral: false });
    }

    const bannedUsers = await interaction.guild.bans.fetch();
    if (bannedUsers.some(user => user.user.id === targetUser.id)) {
      return interaction.reply({ content: '**Bu kişi zaten yasaklanmış?**', ephemeral: false });
    }

    const banEmbed = {
      color: "#99FFCC",
      title: `${interaction.guild.name} Sunucusundan yasaklandınız!`,
      description: `**Sebep:** ${banReason}\n**Yetkili:** ${interaction.user}`,
    };

    try {
      await targetUser.send({ embeds: [banEmbed] });
      await interaction.guild.members.ban(targetUser, { reason: `${banReason} ( ${interaction.user.username} )`});
      interaction.reply({ content: `${targetUser} isimli kişi ${interaction.user} tarafından ***${banReason}*** sebebiyle yasaklandı!`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Kullanıcıyı yasaklarken veya DM gönderirken bir hata oluştu.', ephemeral: true });
    }
  },
};