/** Best-effort public IP for web (replaces react-native-public-ip). */
export async function getPublicIp() {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 4000);
    const res = await fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
    });
    clearTimeout(t);
    if (!res.ok) return "";
    const data = await res.json();
    return data.ip || "";
  } catch {
    return "";
  }
}
