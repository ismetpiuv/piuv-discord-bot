const Discord = require('discord.js');


module.exports = {
  conf: {
    aliases: ["emoji","addemoji"],
    name: "emojiekle",
},

run: async (client, message, args) => {
 let emoji = args[0];
 let emojiName = args[1];
 if (!emoji) return message.reply({ content: `Bir Emoji belirtmelisin.`})
 if (!emojiName) return message.reply({ content: `Emojiye isim seçmelisin.`})

 const parseCustomEmoji = Discord.Util.parseEmoji(emoji);
 if (parseCustomEmoji.id) {
   const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
     parseCustomEmoji.animated ? 'gif' : 'png'
   }`;
   const createEmoji = await message.guild.emojis.create(emojiLink, emojiName || parseCustomEmoji.name);
   message.reply({
     content: `${createEmoji} emojisi sunucuya eklendi.`,
   });
 } else {
  message.reply({
     content: ':x: Emoji bulunamadı.',
     ephemeral: true,
   });
  }
 },
};
