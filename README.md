# piuv Discord Bot

Kurulum kolay kurcalayın çözersiniz
src/configs/emojis.json içindeki emojileri eklemeyi unutmayın eklemesseniz çalışmazlar
içinde ufak tefek kusurlar bıraktım onlarıda düzeltebilirsiniz bence

# Settings

{
 "token": "", // Botun tokeni
 "prefix": [".","!"], // Botun prefixleri
 "guildID": "", // Botun çalışacağı discord sunucusunun idsi
 "BotClientID": "", // Botun kullanıcı idsi
 "mongoUrl": "", // Mongodb urlsi
 "developers": ["301327730543165440"], // Bot developerları
 "founderperm": "", // Sunucudaki founder rolünün idsi (aktif, bakım komutlarını kullanabilmesi için)
 "developerperm": "", // Sunucudaki developer rolünün idsi (aktif, bakım komutlarını kullanabilmesi için)
 "botSes": "", // Botun aktif olduğu süreçte gireceği ses kanalı
 "footerText": "ismetpiuv 💜 xxx", // Embedların footerındaki yazı         
 "oyunetkyazi": "ismetpiuv 💜 xxx", // Oyun etkinliğindeki yazacak şey
 "oyunetktur": "PLAYING", // Oyun etkinliğinin türü (PLAYING/LISTENING/STREAMING/COMPETING)
 "embedrenk": "#99FFCC", // Tüm embedlarda kullanılacak renk
 "yetkili": "",

 "whitelist": {
  "wllogkanal": "", // Whitelist log kanal idsi
  "wlpermi": "", // Whitelist rol idsi
  "wlyetkilisi": "" // Whitelist verecek yetkili rol idsi
 },

 "karakteronay": {
  "onaylogkanal": "", // Karakter onay log kanal idsi
  "onaypermi": "", // Karakter onay rol idsi
  "onayyetkilisi": "" // Karakter onay verecek yetkili rol idsi
 },
 
 "uyari": {
  "uyari1": "", // Uyarı 1 rol idsi
  "uyari2": "", // Uyarı 2 rol idsi
  "uyari3": "", // Uyarı 3 rol idsi
  "uyarilogkanal": "" // Uyarı log kanalı idsi
 },

 "server": {
  "cfxip": "https://cfx.re/join/", // Sunucunun cfx ip adresi (**/join/**'dan sonrasına kendi ipnizi koyun yeterli)
  "ipadresi": "cfx.re/join/", // Burdada aynı şekilde sunucunun cfx ipsi (**/join/**'dan sonrasına kendi ipnizi koyun yeterli)
  "sunucuadi":"xxx Roleplay" // Sunucu adı
 }
}
