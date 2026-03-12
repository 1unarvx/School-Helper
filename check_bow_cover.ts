async function checkBowCover() {
  const url = "https://gn-math.github.io/covers/0.png";
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${url}: ${res.status}`);
  } catch (e) {}
}
checkBowCover();
