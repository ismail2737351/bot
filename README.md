# Discord XP Pro Bot 🎮

An advanced Discord leveling and XP system bot with comprehensive features for server engagement.

## ✨ Features

### Core Systems
- **Dual XP System**: Chat XP + Voice XP tracking
- **Dynamic Leveling**: Exponential level progression
- **Prestige System**: Reset levels with permanent bonuses
- **Achievement System**: 50+ unique achievements
- **Badge System**: Visual recognition of user accomplishments

### Rank Card
- 4K Resolution (1920×1080)
- Neon Glassmorphism Design
- Dynamic Backgrounds (based on level)
- Animated Gradients & Particle Effects
- Real-time Stats Display

### Advanced Features
- **Leaderboards**: Weekly, Monthly, All-time
- **XP Multipliers**: Role, Channel, Global, Booster
- **Level Rewards**: Auto-role assignment
- **Anti-Cheat**: Suspicious activity detection
- **AFK Detection**: Smart voice tracking
- **Multi-language**: Arabic & English support

### Commands

#### General Commands
```
/rank [user]           - Display user rank card
/top [page]            - Top 10 leaderboard
/level                 - Current level info
/leaderboard [type]    - Advanced leaderboard
/achievements          - View achievements
```

#### Admin Commands
```
/setlevel <user> <level>       - Set user level
/resetxp <user>               - Reset user XP
/addxp <user> <amount>        - Add XP manually
/removexp <user> <amount>     - Remove XP manually
/setmultiplier <type> <value> - Set XP multiplier
/setreward <level> <role>     - Set level reward
/prestige <user>              - Prestige user
```

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm/yarn
- MongoDB Atlas account
- Discord bot token

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/ismail2737351/bot.git
   cd bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your tokens and config
   ```

4. **Run bot**
   ```bash
   npm start        # Production
   npm run dev      # Development
   ```

## 🏗️ Project Structure

```
src/
├── commands/          # Command files
│   ├── general/      # User commands
│   └── admin/        # Admin commands
├── events/           # Discord events
├── systems/          # Core systems
├── database/         # Database models & connection
├── utils/            # Utilities & helpers
├── handlers/         # Command & event handlers
└── index.js          # Main entry point
```

## 📊 Database Models

### UserXP
- userId, guildId (indexes)
- XP tracking (total, chat, voice)
- Level & Prestige
- Achievements & Badges
- Voice statistics
- Timestamps & activity dates

### GuildConfig
- XP Multipliers (roles, channels, global)
- Level Rewards
- Cooldown settings
- Ignored channels/roles
- Language preference
- Logging configuration

## 🎨 Rank Card Design

The rank card features:
- **256×256px** animated avatar with neon glow
- **3D level sphere** with holographic effects
- **Progress bars** for Chat/Voice/Total XP
- **Achievement badges** system
- **Dynamic backgrounds** based on level
- **Glassmorphism** design elements
- **Particle system** animations

## 🔒 Security

- Permission verification for admin commands
- Rate limiting on API endpoints
- MongoDB injection prevention
- Token encryption via dotenv
- Suspicious activity logging
- Anti-spam protection

## 📈 Performance

- Rank card generation: <2 seconds
- XP processing: 1000+ requests/second
- Connection pooling for MongoDB
- Redis caching support
- Rate limiting protection

## 🌐 Compatibility

- Discord.js v14.14.0+
- Node.js 18+
- MongoDB 4.0+
- Cross-platform (Windows/Linux/Mac)
- Docker support included

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**ismail2737351** - GitHub Profile

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and submit pull requests.
