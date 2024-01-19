const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Kullanıcının yada sizin avatarınızı gönderir.")
    .addUserOption((option) =>
          option
        .setName("kişi")
        .setDescription("Avatarına bakmak istediğiniz üyeyi belirtiniz.")
    ),
  async execute(interaction, client) {

    const member = interaction.options.getUser('kişi') || interaction.user;
    const fetchUser = await client.users.fetch(member.id);
    
    interaction.reply({ content: `> ${ hyperlink(`${fetchUser.username}`, fetchUser.displayAvatarURL({ dynamic: true, size: 4096 }))}`})
  }
};