import fs from 'fs';

async function checkSample() {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  const dataMatch = indexHtml.match(/const data = (\{[\s\S]+?\});/);
  if (!dataMatch) return;
  
  const data = JSON.parse(dataMatch[1]);
  const sample = data.games.slice(0, 20);
  
  console.log('Checking sample of 20 games...');
  for (const game of sample) {
    try {
      const res = await fetch(game.url, { method: 'HEAD' });
      console.log(`[${res.status}] ${game.title} - ${game.url}`);
    } catch (e) {
      console.log(`[ERR] ${game.title} - ${game.url}`);
    }
  }
}

checkSample();
