const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const loadCommands = async (client) => {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFolders = fs.readdirSync(commandsPath);

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const command = require(filePath);

      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        logger.info(`Command loaded: ${command.data.name}`);
      }
    }
  }

  logger.info(`Loaded ${client.commands.size} commands`);
};

module.exports = loadCommands;
