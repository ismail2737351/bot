module.exports = {
  // Bot Settings
  prefix: process.env.PREFIX || '!',
  nodeEnv: process.env.NODE_ENV || 'development',

  // XP Settings
  xp: {
    messageMinLength: 3,
    messageCooldown: 60000, // 60 seconds
    minMessageXP: 10,
    maxMessageXP: 100,
    dailyXPLimit: 2000,
    levelFormula: (level) => Math.floor(100 * Math.pow(level, 1.5)),
    maxLevel: 999,
  },

  // Voice XP Settings
  voice: {
    xpPerMinute: 1,
    afkTimeout: 300000, // 5 minutes
    dailyVoiceXPLimit: 1000,
    cooldown: 60000, // 1 minute
  },

  // Spam Protection
  spam: {
    enableCooldown: true,
    cooldownSeconds: 60,
    ignoreRepeatedMessages: true,
    repeatThreshold: 5,
    repeatTimeWindow: 10000, // 10 seconds
  },

  // Prestige System
  prestige: {
    prestigeLevel: 100,
    xpMultiplierPerPrestige: 0.1, // 10% per prestige
    maxPrestige: 10,
  },

  // Database
  database: {
    connectionTimeout: 10000,
    retryAttempts: 5,
    retryDelay: 1000,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'timestamp=<timestamp> level=<level> message=<message>',
  },
};
