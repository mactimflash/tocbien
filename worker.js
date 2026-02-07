export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") return new Response("OK");

    let data = {};
    try { data = await request.json(); } catch {}

    const payload = {
      type: data.type || "page_view",
      path: data.path || "",
      ref: data.ref || "",
      ua: data.ua || "",
      ts: new Date().toISOString()
    };

    const res = await fetch(
      `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GH_TOKEN}`,
          "User-Agent": "lol-helper",
          "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
          event_type: "page_view",
          client_payload: payload
        })
      }
    );

    return new Response("ok");
  }
};
