const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserXP = require('../../database/models/UserXP');
const { calculateLevel, formatNumber } = require('../../utils/formatters');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Check your current level and XP'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const userXP = await UserXP.findOne({
        userId: interaction.user.id,
        guildId: interaction.guildId,
      });

      if (!userXP) {
        return await interaction.editReply(
          'No XP data found. Start chatting or joining voice channels to earn XP!'
        );
      }

      const { level, currentLevelXP, nextLevelXP } = calculateLevel(userXP.totalXP);
      const progressPercentage = Math.floor((currentLevelXP / nextLevelXP) * 100);
      const progressBar =
        '█'.repeat(Math.floor(progressPercentage / 5)) + '░'.repeat(20 - Math.floor(progressPercentage / 5));

      const embed = new EmbedBuilder()
        .setColor('#00f3ff')
        .setAuthor({
          name: `${interaction.user.username}'s Level Information`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .addFields(
          { name: 'Current Level', value: `${level}`, inline: true },
          { name: 'Prestige', value: `${userXP.prestige}`, inline: true },
          { name: 'Total XP', value: formatNumber(userXP.totalXP), inline: false },
          { name: 'Chat XP', value: formatNumber(userXP.chatXP), inline: true },
          { name: 'Voice XP', value: formatNumber(userXP.voiceXP), inline: true },
          {
            name: `Progress to Level ${level + 1}`,
            value: `\`${progressBar}\` ${progressPercentage}%\n${currentLevelXP}/${nextLevelXP} XP`,
            inline: false,
          }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      logger.error('Error in level command:', error);
      await interaction.editReply('An error occurred while fetching your level information.');
    }
  },
};
