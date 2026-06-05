const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema(
  {
    guildId: { type: String, required: true, unique: true, index: true },
    multipliers: {
      roles: { type: Map, of: Number, default: new Map() },
      channels: { type: Map, of: Number, default: new Map() },
      global: { type: Number, default: 1 },
    },
    levelRewards: { type: Map, of: String, default: new Map() },
    xpCooldown: { type: Number, default: 60000 },
    voiceCooldown: { type: Number, default: 60000 },
    ignoreChannels: [String],
    ignoreRoles: [String],
    language: { type: String, enum: ['ar', 'en'], default: 'en' },
    prefix: { type: String, default: '!' },
    logsChannel: String,
    levelUpMessage: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GuildConfig', guildConfigSchema);
