async function check3kh0() {
  const urls = [
    'https://3kh0.github.io/projects.json',
    'https://raw.githubusercontent.com/3kh0/3kh0.github.io/main/projects.json',
    'https://raw.githubusercontent.com/3kh0/3kh0-assets/main/games.json'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(`Found at ${url}:`, Object.keys(data).length);
        return;
      }
    } catch (e) {}
  }
  console.log('None found');
}
check3kh0();
