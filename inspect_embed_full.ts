async function inspectEmbed() {
  const url = 'https://768801222-atari-embeds.googleusercontent.com/embeds/16cb204cf3a9d4d223a0a3fd8b0eec5d/inner-frame-minified.html';
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}
inspectEmbed();
