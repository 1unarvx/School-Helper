async function check3kh0() {
  const url = 'https://raw.githubusercontent.com/3kh0/3kh0-assets/main/games.json';
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      console.log('Found 3kh0 games:', Object.keys(data).length);
      console.log(JSON.stringify(Object.keys(data).slice(0, 10)));
    } else {
      console.log('3kh0 not found');
    }
  } catch (e) {
    console.error(e);
  }
}
check3kh0();
