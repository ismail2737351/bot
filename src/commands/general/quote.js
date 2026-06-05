const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random inspiring quote')
    .addStringOption((option) =>
      option
        .setName('author')
        .setDescription('Filter by author (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const author = interaction.options.getString('author');
      let apiUrl = 'https://api.quotable.io/random';

      if (author) {
        apiUrl = `https://api.quotable.io/quotes?author=${encodeURIComponent(author)}&limit=1`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      let quoteData = await response.json();

      // Handle array response
      if (quoteData.results && Array.isArray(quoteData.results)) {
        if (quoteData.results.length === 0) {
          return await interaction.editReply('❌ No quotes found for that author.');
        }
        quoteData = quoteData.results[0];
      }

      const embed = new EmbedBuilder()
        .setColor('#00f3ff')
        .setTitle('💭 Random Quote')
        .setDescription(`"${quoteData.content}"`)
        .addFields(
          { name: 'Author', value: quoteData.author?.replace(', type.name', '') || 'Unknown', inline: true },
          { name: 'Length', value: `${quoteData.content.length} characters`, inline: true }
        )
        .setFooter({ text: `Quote ID: ${quoteData._id || 'N/A'}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      logger.info(`${interaction.user.username} requested a quote${author ? ` by ${author}` : ''}`);
    } catch (error) {
      logger.error('Error fetching quote:', error);
      await interaction.editReply('❌ Failed to fetch a quote. Please try again later!');
    }
  },
};
