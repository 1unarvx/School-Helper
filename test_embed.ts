async function testEmbed() {
  const url = 'https://768801222-atari-embeds.googleusercontent.com/embeds/16cb204cf3a9d4d223a0a3fd8b0eec5d/inner-frame-minified.html';
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Length:', text.length);
    console.log('Preview:', text.substring(0, 500));
  } catch (e) {
    console.error('Fetch failed:', e.message);
  }
}
testEmbed();
