async function getThumbnail() {
  const url = "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/covers/0.png";
  try {
    const res = await fetch(url);
    console.log(`${url}: ${res.status} ${res.headers.get('content-type')}`);
  } catch (e) {}
}
getThumbnail();
