async function checkGNMathURL() {
  const res = await fetch("https://cdn.jsdelivr.net/gh/gn-math/assets@latest/zones.json");
  const json = await res.json();
  const game2048 = json.find(g => g.name === "2048");
  console.log(JSON.stringify(game2048, null, 2));
}
checkGNMathURL();
