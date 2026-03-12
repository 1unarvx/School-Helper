async function checkTBG() {
  const url = 'https://tbg95.github.io/slope/';
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Length:', text.length);
  } catch (e) {
    console.error(e);
  }
}
checkTBG();
