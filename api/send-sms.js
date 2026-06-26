// Vercel serverless function — Twilio SMS proxy
// Credentials stay server-side in Vercel env vars:
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, TWILIO_APP_SECRET
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.TWILIO_APP_SECRET;
  if (secret && req.headers['x-app-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from  = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    return res.status(503).json({ error: 'SMS not configured' });
  }

  const { to, body } = req.body || {};
  if (!to || !body) {
    return res.status(400).json({ error: 'Missing to or body' });
  }

  const phone = String(to).replace(/[-\s]/g, '');
  const normalized = phone.charAt(0) === '0' ? '+972' + phone.slice(1) : phone;

  const params = new URLSearchParams({ To: normalized, From: from, Body: body });
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(sid + ':' + token).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Twilio error' });
    return res.status(200).json({ sid: data.sid });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
