async function checkGNMathPath() {
  const urls = [
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/html/114-f.html",
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/114-f.html",
    "https://cdn.jsdelivr.net/gh/gn-math/html@latest/114-f.html"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url}: ${res.status}`);
    } catch (e) {}
  }
}
checkGNMathPath();
