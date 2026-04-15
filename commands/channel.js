// ==============================================
// 📢 Azahrabot Channel Command (v5.0 Refined)
// Shows native "View Channel" + banner + info
// ==============================================

const small = require("../lib/small_lib");

module.exports = async (sock, msg, from) => {
  try {
    // 💬 React to indicate command trigger
    await sock.sendMessage(from, { react: { text: "📢", key: msg.key } }).catch(() => {});
  } catch {}

  const channelName = small.channel?.name || "TanvirBot Official";
  const channelJid = small.channel?.jid || "120363408736391595@newsletter";
  const bannerUrl = small.channel?.banner ||
    "https://res.cloudinary.com/ds1lpf36n/image/upload/v1762079835/satoru-gojo-black-3840x2160-14684_1_amj5ys.png";

  const caption = `
📢 *${channelName}*
━━━━━━━━━━━━━━━━━━━
💫 Stay updated with:
• Latest TanvirBot features  
• Bug fixes & performance updates  
• Dev sneak peeks & beta releases  
━━━━━━━━━━━━━━━━━━━
> powered by *${small.author || "TanvirTech"}* ⚡
`.trim();

  try {
    // 🪄 Send banner with channel info
    await sock.sendMessage(
      from,
      {
        image: { url: bannerUrl },
        caption,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelJid,
            newsletterName: channelName,
            serverMessageId: -1,
          },
        },
      },
      { quoted: msg }
    );

    await sock.sendMessage(from, { react: { text: "✅", key: msg.key } }).catch(() => {});
  } catch (err) {
    console.error("❌ Channel command failed:", err?.message || err);
    await sock.sendMessage(from, { text: "⚠️ Failed to load channel info." }, { quoted: msg });
  }
};
