async function findRealSource(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Look for common game engine patterns or direct links
    const patterns = [
      /https?:\/\/[^"']+\.github\.io\/[^"']+/g,
      /https?:\/\/[^"']+\.wasm/g,
      /https?:\/\/[^"']+\.unityweb/g,
      /https?:\/\/[^"']+\.swf/g,
      /https?:\/\/cdn\.jsdelivr\.net\/[^"']+/g,
      /https?:\/\/unpkg\.com\/[^"']+/g
    ];
    
    const results = [];
    for (const pattern of patterns) {
      const matches = html.match(pattern) || [];
      results.push(...matches);
    }
    
    return [...new Set(results)];
  } catch (e) {
    return [];
  }
}

async function run() {
  const url = 'https://sites.google.com/view/drive-u-7-home-10/home/slope';
  const sources = await findRealSource(url);
  console.log('Sources for Slope:', sources);
}

run();
