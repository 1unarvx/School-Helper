async function checkSkid() {
  const url = 'https://raw.githubusercontent.com/skid-inc/skid-inc.github.io/master/games.json';
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      console.log('Found Skid games:', Object.keys(data).length);
      console.log(JSON.stringify(Object.keys(data).slice(0, 10)));
    } else {
      console.log('Skid not found');
    }
  } catch (e) {
    console.error(e);
  }
}
checkSkid();
