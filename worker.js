// worker.js
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Chỉ cho POST /track
    if (request.method !== "POST" || url.pathname !== "/track") {
      return new Response("Not found", { status: 404, headers: corsHeaders });
    }

    // Parse JSON
    let data = {};
    try {
      data = await request.json();
    } catch (_) {}

    // Enrich payload
    const payload = {
      type: data.type || "page_view",
      path: data.path || "",
      ref: data.ref || request.headers.get("Referer") || "",
      ua: data.ua || request.headers.get("User-Agent") || "",
      ts: data.ts || new Date().toISOString(),
      ip: request.headers.get("CF-Connecting-IP") || "",
      country: request.headers.get("CF-IPCountry") || "",
    };

    // ===== 1) Send Telegram realtime =====
    // Nếu chưa set secrets thì vẫn trả ok để không phá tracking
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    let telegramOk = false;
    if (botToken && chatId) {
      const text =
        `👀 Page view\n` +
        `• path: ${payload.path}\n` +
        `• ip: ${payload.ip} ${payload.country}\n` +
        `• ref: ${payload.ref}\n` +
        `• ua: ${payload.ua}\n` +
        `• time: ${payload.ts}`;

      try {
        const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        telegramOk = tg.ok;
      } catch (_) {}
    }

    // ===== 2) (Optional) Dispatch to GitHub workflow =====
    // Nếu bạn vẫn muốn giữ cơ chế dispatch
    let ghOk = false;
    if (env.GH_OWNER && env.GH_REPO && env.GH_TOKEN) {
      try {
        const res = await fetch(`https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/dispatches`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.GH_TOKEN}`,
            "User-Agent": "lol-helper",
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "page_view",
            client_payload: payload,
          }),
        });
        ghOk = res.ok;
      } catch (_) {}
    }

    // Response luôn có CORS headers
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  },
};
