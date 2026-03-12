async function findBowmasters() {
  const urls = [
    "https://gn-math.github.io/html/0.html",
    "https://gn-math.github.io/0.html",
    "https://gn-math.github.io/projects/0/index.html",
    "https://gn-math.github.io/g/0.html"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url}: ${res.status}`);
    } catch (e) {}
  }
}
findBowmasters();
