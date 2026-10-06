// CDN app.js loader — reassembles base64 parts then evals as module via blob URL
const parts = 5;
let b64 = '';
for (let i = 0; i < parts; i++) {
  const r = await fetch('chunks/app.b64.' + i);
  if (!r.ok) throw new Error('missing chunk ' + i);
  b64 += (await r.text()).trim();
}
const bin = atob(b64);
const bytes = new Uint8Array(bin.length);
for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
const code = new TextDecoder().decode(bytes);
const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
await import(url);
