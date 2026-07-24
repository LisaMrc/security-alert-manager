// What the file does:
// it contains a `fetchIpInfo(ip)` function
// that calls the external IPinfo API
// to retrieve the geolocation and ISP for a given IP address,
// using an in-memory cache to avoid repeating it
// the network call every time the same alert is clicked

const cache = new Map();

// Here, we use 5 minutes as a ttl randomly :
// long enough to prevent reccuring calls,
// but short enough to not become obsolete.
// Could be longer though
const TTL = 5 * 60 * 1000;

export async function fetchIpInfo(ip) {
  const cached = cache.get(ip);
  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.data;
  }

  const res = await fetch(`https://ipinfo.io/${ip}/json`);
  if (!res.ok) {
    throw new Error(`IPinfo request failed: ${res.status}`);
  }
  const data = await res.json();
  cache.set(ip, { data, timestamp: Date.now() });
  return data;
}
