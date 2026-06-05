const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const UserXP = require('../../database/models/UserXP');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetxp')
    .setDescription('Reset a users XP (Admin only)')
    .addUserOption((option) => option.setName('user').setDescription('User to reset XP for').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const targetUser = interaction.options.getUser('user');

      if (targetUser.bot) {
        return await interaction.editReply('Cannot reset XP for bots');
      }

      const result = await UserXP.findOneAndUpdate(
        {
          userId: targetUser.id,
          guildId: interaction.guildId,
        },
        {
          totalXP: 0,
          chatXP: 0,
          voiceXP: 0,
          level: 1,
          weeklyXP: 0,
          monthlyXP: 0,
        },
        { new: true }
      );

      if (!result) {
        return await interaction.editReply('User not found in the database.');
      }

      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('XP Reset')
        .addFields(
          { name: 'User', value: targetUser.username, inline: true },
          { name: 'Status', value: 'XP Reset to 0', inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      logger.info(`${interaction.user.username} reset XP for ${targetUser.username}`);
    } catch (error) {
      logger.error('Error in resetxp command:', error);
      await interaction.editReply('An error occurred while resetting XP.');
    }
  },
};
