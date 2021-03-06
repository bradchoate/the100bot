const sqlite = require('sqlite');
const { CommandoClient, SQLiteProvider } = require("discord.js-commando");
const path = require("path");
require('dotenv').config();




const client = new CommandoClient({
  commandPrefix: "!",
  owner: process.env.OWNER_DISCORD_ID,
  invite: "https://discord.gg/dBZRVB9",
  disableEveryone: true,
  unknownCommandResponse: false
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
  client.setProvider(new SQLiteProvider(db));
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["general", "General Commands"],
    ["group", "Group Commands"],
    ["gamingsession", "Gaming Session Commands"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with The100.io");
});
client.on('error', error => {
  console.log("Client Error");
  console.error('The WebSocket encountered an error:', error);
});

client.login(process.env.DISCORD_BOT_TOKEN);