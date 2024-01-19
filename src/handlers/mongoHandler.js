const mongoose = require("mongoose");
const config = require("../configs/settings.json");

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı başarılı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı başarısız!");
});