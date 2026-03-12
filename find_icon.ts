async function find3kh0Icon() {
  const urls = [
    "https://3kh0.github.io/projects/slope/slope.png",
    "https://3kh0.github.io/projects/slope/icon.png",
    "https://3kh0.github.io/projects/slope/logo.png",
    "https://3kh0.github.io/projects/slope/thumbnail.png"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url}: ${res.status}`);
    } catch (e) {}
  }
}
find3kh0Icon();
