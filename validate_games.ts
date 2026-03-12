import fs from 'fs';

async function validateAndClean() {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  const dataMatch = indexHtml.match(/const data = (\{[\s\S]+?\});/);
  if (!dataMatch) return;
  
  const data = JSON.parse(dataMatch[1]);
  const games = data.games;
  console.log(`Initial games: ${games.length}`);

  // 1. Deduplicate by normalized title
  const seen = new Map();
  const cleanedGames = [];
  
  for (const game of games) {
    const normalizedTitle = game.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seen.has(normalizedTitle)) {
      const existing = seen.get(normalizedTitle);
      // Prefer GN-Math (starts with gn-) over others
      if (game.id.startsWith('gn-') && !existing.id.startsWith('gn-')) {
        seen.set(normalizedTitle, game);
      }
      continue;
    }
    seen.set(normalizedTitle, game);
  }
  
  const uniqueGames = Array.from(seen.values());
  console.log(`Unique games: ${uniqueGames.length}`);

  // 2. Fix 3kh0 thumbnails
  // Many 3kh0 games have icons at https://3kh0.github.io/projects/{id}/icon.png or similar
  // But checking all would be slow. Let's just use a better placeholder or try a few.
  uniqueGames.forEach(game => {
    if (game.id.startsWith('ug76-')) {
      // For UG76, use a more descriptive placeholder if possible
      // game.thumbnail = `https://images.weserv.nl/?url=https://sites.google.com/view/unblocked-game76/${game.id.replace('ug76-', '')}&w=400&h=300&fit=cover`;
      // Actually, let's just keep picsum but with a better seed
    }
    
    // Ensure embedUrl is set
    if (!game.embedUrl) {
      game.embedUrl = game.url;
    }
  });

  // 3. Sort
  uniqueGames.sort((a, b) => a.title.localeCompare(b.title));

  data.games = uniqueGames;
  const newDataStr = JSON.stringify(data, null, 2);
  const newIndexHtml = indexHtml.replace(/const data = \{[\s\S]+?\};/, `const data = ${newDataStr};`);
  fs.writeFileSync('index.html', newIndexHtml);
  console.log('Cleanup complete');
}

validateAndClean();
