# piuv-discord-bot

`piuv-discord-bot` is a comprehensive management bot for Discord, specifically tailored for FiveM roleplay communities. It provides a wide range of features through both slash and prefix commands, including moderation, user management, server status announcements, and roleplay-specific functionalities like whitelisting and character approvals.

## Features

-   **Full Moderation Suite:** Ban, kick, unban, and a tiered warning system.
-   **Roleplay Management:** Whitelist and character approval management with dedicated logging channels.
-   **Server Status:** Announce when the server is active or in maintenance mode with a single command.
-   **Utility Commands:** Fetch user avatars and banners, display server IP with a direct connect button, and add emojis on the fly.
-   **Automated Handlers:** Includes handlers for events, commands, functions, and MongoDB connection.
-   **Customizable:** Extensive configuration through `settings.json` to tailor the bot to your server's specific needs.

## Prerequisites

-   [Node.js](https://nodejs.org/en/) (v16.9.0 or higher recommended)
-   A [MongoDB](https://www.mongodb.com/) database instance (local or cloud)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ismetpiuv/piuv-discord-bot.git
    cd piuv-discord-bot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the Bot:**
    *   Open `src/configs/settings.json` and fill in all the required values. See the [Configuration](#configuration) section below for a detailed explanation of each field.
    *   Open `src/configs/emojis.json` and provide the IDs for ticking, cross, and sad emojis that you have uploaded to your server. The bot will not work correctly without them.

4.  **Run the Bot:**
    *   On Windows, you can use the provided batch file:
        ```bash
        baslat.bat
        ```
    *   Alternatively, run it directly with Node.js from the terminal:
        ```bash
        node piuv.js
        ```

## Configuration

The main configuration is handled in `src/configs/settings.json`. All fields must be filled correctly for the bot to function as intended.

```json
{
 "token": "", // Your Discord bot's token
 "prefix": [".","!"], // Prefixes for text-based commands
 "guildID": "", // The ID of the Discord server where the bot will operate
 "BotClientID": "", // The user ID (Client ID) of your bot
 "mongoUrl": "", // Your MongoDB connection string
 "developers": ["301327730543165440"], // User IDs of bot developers
 "founderperm": "", // Role ID for the server founder (for /aktif, /bakım commands)
 "developerperm": "", // Role ID for developers (for /aktif, /bakım commands)
 "botSes": "", // Voice channel ID for the bot to join when active
 "footerText": "ismetpiuv 💜 xxx", // Text to display in the footer of embeds         
 "oyunetkyazi": "ismetpiuv 💜 xxx", // The text for the bot's activity status
 "oyunetktur": "PLAYING", // The type of activity (PLAYING/LISTENING/STREAMING/COMPETING)
 "embedrenk": "#99FFCC", // The default color for all embeds
 "yetkili": "", // General staff/authorized role ID for commands like /destek

 "whitelist": {
  "wllogkanal": "", // Channel ID for whitelist logs
  "wlpermi": "", // Whitelist role ID
  "wlyetkilisi": "" // Role ID for staff who can manage whitelists
 },

 "karakteronay": {
  "onaylogkanal": "", // Channel ID for character approval logs
  "onaypermi": "", // Character approval role ID
  "onayyetkilisi": "" // Role ID for staff who can manage character approvals
 },
 
 "uyari": {
  "uyari1": "", // Role ID for the 1st warning
  "uyari2": "", // Role ID for the 2nd warning
  "uyari3": "", // Role ID for the 3rd warning
  "uyarilogkanal": "" // Channel ID for warning logs
 },

 "server": {
  "cfxip": "https://cfx.re/join/xxxx", // Your server's full cfx.re connection URL
  "ipadresi": "cfx.re/join/xxxx", // Your server's cfx.re connection address
  "sunucuadi":"xxx Roleplay" // Your server's name
 }
}
```

## Commands

This bot uses both slash (/) and prefix (`.`, `!`) commands.

### Slash Commands
-   `/aktif`: Sets the server status to "Active" and provides a connection button.
-   `/avatar [user]`: Displays the avatar of the specified user or yourself.
-   `/bakım [reason]`: Sets the server status to "Maintenance" with a specified reason.
-   `/ban [user] [reason]`: Bans a user from the server.
-   `/banner [user]`: Displays the banner of the specified user or yourself.
-   `/kick [user] [reason]`: Kicks a user from the server.
-   `/onayal [user] [reason]`: Removes the "Character Approved" role from a user and logs it.
-   `/onayver [user] [steam_profile]`: Grants the "Character Approved" role to a user and logs it.
-   `/restart`: Restarts the bot (Developer only).
-   `/unban [user_id]`: Unbans a user by their ID.
-   `/uyarial [user] [warning_level] [reason]`: Removes a specific warning role from a user. (`warning_level` should be 1, 2, or 3).
-   `/uyariver [user] [warning_level] [reason]`: Adds a specific warning role to a user. (`warning_level` should be 1, 2, or 3).
-   `/wlal [user] [reason]`: Removes the whitelist role from a user.
-   `/wlver [user] [steam_profile]`: Grants the whitelist role to a user.
-   `/yaz [message]`: Makes the bot send a specified message in the current channel (Developer only).

### Prefix Commands
-   `.destek`: Pings the authorized staff role to notify them that a user needs support.
-   `.emoji-yükle [emoji] [name]`: Adds a custom emoji to the server.
-   `.ip`: Displays the server's connection IP and a button to connect.
-   `.kayıt`: Allows a user to request registration, pinging the authorized staff role. Subject to a 30-second cooldown.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
