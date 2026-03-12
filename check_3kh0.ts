async function check3kh0Thumbnails() {
  const testId = "slope";
  const url = `https://raw.githubusercontent.com/3kh0/3kh0-assets/main/thumbnails/${testId}.png`;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`Thumbnail for ${testId}: ${res.status}`);
  } catch (e) {
    console.error('Failed to check 3kh0 thumbnail:', e);
  }
}
check3kh0Thumbnails();
