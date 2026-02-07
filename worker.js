// worker.js (CORS fixed for ALL responses)
function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allow = env.ALLOW_ORIGIN || "*";

  // Nếu bạn set ALLOW_ORIGIN = "https://mactimflash.github.io"
  // thì trả đúng origin đó. Nếu allow="*" thì trả "*".
  const allowOrigin = (allow === "*") ? "*" : allow;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = corsHeaders(request, env);

    // chỉ xử lý endpoint /track
    if (url.pathname !== "/track") {
      return new Response("OK", { status: 200, headers });
    }

    // preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers });
    }

    let data = {};
    try {
      data = await request.json();
    } catch {}

    const payload = {
      type: data.type || "page_view",
      path: data.path || "",
      ref: data.ref || "",
      ua: data.ua || "",
      ts: new Date().toISOString(),
    };

    // gọi GitHub dispatch (nếu bạn đang dùng workflow gửi Telegram)
    try {
      const res = await fetch(`https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/dispatches`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GH_TOKEN}`,
          "User-Agent": "lol-helper",
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "page_view",
          client_payload: payload,
        }),
      });

      // trả về status để debug nhanh
      const out = { ok: res.ok, gh_status: res.status };
      return new Response(JSON.stringify(out), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: String(e) }), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
