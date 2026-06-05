const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Get a random fun fact'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      const factData = await response.json();

      const embed = new EmbedBuilder()
        .setColor('#ffd700')
        .setTitle('💡 Random Fun Fact')
        .setDescription(factData.text || factData.fact || 'Unable to fetch fact')
        .setFooter({ text: 'Did you know?' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      logger.info(`${interaction.user.username} requested a fun fact`);
    } catch (error) {
      logger.error('Error fetching fact:', error);
      await interaction.editReply('❌ Failed to fetch a fact. Please try again later!');
    }
  },
};
