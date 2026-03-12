async function checkGNMathConfig() {
  const urls = [
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/config.json",
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/settings.json"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        console.log(`${url}:`, json);
      } else {
        console.log(`${url}: ${res.status}`);
      }
    } catch (e) {}
  }
}
checkGNMathConfig();
