async function checkBowCover2() {
  const url = "https://gn-math.github.io/assets/covers/0.png";
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${url}: ${res.status}`);
  } catch (e) {}
}
checkBowCover2();
