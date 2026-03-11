async function check3kh0() {
  const urls = [
    'https://raw.githubusercontent.com/3kh0/3kh0-assets/main/games.json',
    'https://3kh0.github.io/projects.json',
    'https://raw.githubusercontent.com/3kh0/3kh0.github.io/main/projects.json'
  ];
  
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`Found at ${url}`);
        const data = await res.json();
        console.log(`Count: ${Object.keys(data).length}`);
        // console.log(JSON.stringify(Object.keys(data).slice(0, 5)));
        return;
      }
    } catch (e) {}
  }
  console.log('None found.');
}
check3kh0();
