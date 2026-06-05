const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke')
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Type of joke')
        .setRequired(false)
        .addChoices(
          { name: 'General', value: 'general' },
          { name: 'Programming', value: 'programming' },
          { name: 'Knock-Knock', value: 'knock-knock' }
        )
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const jokeType = interaction.options.getString('type') || 'general';
      
      let apiUrl = 'https://official-joke-api.appspot.com/jokes/';
      
      if (jokeType === 'general') {
        apiUrl += 'general/random';
      } else if (jokeType === 'programming') {
        apiUrl += 'programming/random';
      } else if (jokeType === 'knock-knock') {
        apiUrl += 'knock-knock/random';
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      let jokeData = await response.json();

      // Handle array response
      if (Array.isArray(jokeData)) {
        jokeData = jokeData[0];
      }

      const embed = new EmbedBuilder()
        .setColor('#9b00ff')
        .setTitle('😂 Random Joke')
        .addFields(
          { name: 'Type', value: jokeType.charAt(0).toUpperCase() + jokeType.slice(1), inline: true },
          { name: 'Setup', value: jokeData.setup || 'N/A', inline: false },
          { name: 'Punchline', value: jokeData.punchline || jokeData.delivery || 'N/A', inline: false }
        )
        .setFooter({ text: `Joke ID: ${jokeData.id || 'N/A'}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      logger.info(`${interaction.user.username} requested a ${jokeType} joke`);
    } catch (error) {
      logger.error('Error fetching joke:', error);
      await interaction.editReply('❌ Failed to fetch a joke. Please try again later!');
    }
  },
};
