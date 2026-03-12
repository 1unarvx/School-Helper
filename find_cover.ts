async function findCover() {
  const urls = [
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/covers/0.png",
    "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/0.png",
    "https://gn-math.github.io/assets/0.png",
    "https://gn-math.github.io/0.png"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url}: ${res.status}`);
    } catch (e) {}
  }
}
findCover();
