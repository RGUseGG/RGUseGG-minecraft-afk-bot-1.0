const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_SERVER || '191.96.231.2',
    port: parseInt(process.env.MC_PORT) || 15336,
    username: process.env.MC_USERNAME || 'AFK_Bot',
    version: false, // Auto detect version
    // 🔧 FIX: Chat plugin disable করা হলো error এড়ানোর জন্য
    plugins: {
      chat: false
    }
  });

  // ✅ লগইনের পর চ্যাট কমান্ড পাঠাবে
  bot.on('spawn', () => {
    console.log('🤖 Bot সার্ভারে যুক্ত হয়েছে!');
    bot.chat('/login creativeafkbot');
  });

  // ✅ যখন বট ডিসকানেক্ট হবে তখন আবার চালু হবে
  bot.on('end', () => {
    console.log('🔄 Bot disconnected! Reconnecting...');
    setTimeout(createBot, 5000);
  });

  // ✅ কোনো এরর হলে কনসোলে দেখাবে
  bot.on('error', err => {
    console.log('❌ Error:', err);
  });

  // 🛠️ চ্যাট মেসেজ এলে safely handle করবে (optional)
  bot.on('message', (message) => {
    try {
      console.log('📨 Chat:', message.toString());
    } catch (e) {
      console.warn('⚠️ Chat parse error:', message);
    }
  });
}

createBot();
