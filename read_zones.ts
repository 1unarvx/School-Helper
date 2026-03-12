async function readGNMathZones() {
  const res = await fetch("https://gn-math.github.io/assets/zones.json");
  const json = await res.json();
  console.log(JSON.stringify(json.slice(0, 5), null, 2));
}
readGNMathZones();
