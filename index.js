const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_SERVER || '191.96.231.2',
    port: parseInt(process.env.MC_PORT) || 15336,
    username: process.env.MC_USERNAME || 'CREATIVE_BOT',
    version: '1.20.1', // ✅ Minecraft ভার্সন নির্দিষ্ট করে দেওয়া হলো
    plugins: {
      chat: false // ✅ prismarine-chat error বন্ধ করতে chat plugin off
    }
  });

  bot.on('spawn', () => {
    console.log('🤖 CREATIVE_BOT সার্ভারে যুক্ত হয়েছে!');
    bot.chat('/login creativeafkbot'); // ✅ AuthMe / LoginSecurity command
  });

  bot.on('end', () => {
    console.log('🔄 CREATIVE_BOT disconnected! Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Error:', err);
  });

  bot.on('message', (message) => {
    try {
      console.log('📨 Chat:', message.toString());
    } catch (e) {
      console.warn('⚠️ Chat parse error:', message);
    }
  });
}

createBot();
