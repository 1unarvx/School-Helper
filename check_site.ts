async function checkGNMathSite() {
  const urls = [
    "https://gn-math.github.io/assets/zones.json",
    "https://gn-math.github.io/html/114-f.html"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url}: ${res.status}`);
    } catch (e) {}
  }
}
checkGNMathSite();
