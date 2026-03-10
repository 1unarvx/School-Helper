import data from './data.json' assert { type: 'json' };

const state = {
  activeTab: 'games',
  searchQuery: '',
  selectedItem: null,
  isFullscreen: false
};

function render() {
  const app = document.getElementById('app');
  const filteredItems = (state.activeTab === 'games' ? data.games : data.proxies).filter(item => 
    item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  app.innerHTML = `
    <div class="min-h-screen flex flex-col">
      <!-- Navigation -->
      <nav class="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <i data-lucide="gamepad-2" class="w-5 h-5 text-black"></i>
            </div>
            <span class="font-bold text-xl tracking-tight hidden sm:block">HUB</span>
          </div>

          <div class="flex-1 max-w-md relative">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"></i>
            <input
              type="text"
              id="search-input"
              placeholder="Search games or proxies..."
              class="w-full bg-zinc-800 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value="${state.searchQuery}"
            />
          </div>

          <div class="flex items-center gap-1 bg-zinc-800 p-1 rounded-full">
            <button
              id="tab-games"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${state.activeTab === 'games' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'}"
            >
              <i data-lucide="gamepad-2" class="w-4 h-4"></i>
              Games
            </button>
            <button
              id="tab-proxies"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${state.activeTab === 'proxies' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'}"
            >
              <i data-lucide="globe" class="w-4 h-4"></i>
              Proxies
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <header class="mb-8">
          <h1 class="text-3xl font-bold mb-2 capitalize">
            ${state.activeTab === 'games' ? 'Featured Games' : 'Web Proxies'}
          </h1>
          <p class="text-zinc-500">
            ${state.activeTab === 'games' 
              ? 'Hand-picked unblocked games for your entertainment.' 
              : 'Secure and fast web proxies to browse freely.'}
          </p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${filteredItems.map(item => `
            <div
              data-id="${item.id}"
              class="item-card group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all"
            >
              <div class="aspect-video relative overflow-hidden">
                <img
                  src="${item.thumbnail}"
                  alt="${item.title}"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerpolicy="no-referrer"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span class="bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    PLAY NOW <i data-lucide="external-link" class="w-3 h-3"></i>
                  </span>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="font-bold text-lg group-hover:text-emerald-400 transition-colors">
                    ${item.title}
                  </h3>
                  <span class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded">
                    ${item.category}
                  </span>
                </div>
                <p class="text-zinc-500 text-sm line-clamp-2">
                  ${item.description}
                </p>
              </div>
            </div>
          `).join('')}
        </div>

        ${filteredItems.length === 0 ? `
          <div class="text-center py-20">
            <div class="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
              <i data-lucide="search" class="w-8 h-8 text-zinc-700"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">No results found</h3>
            <p class="text-zinc-500">Try searching for something else.</p>
          </div>
        ` : ''}
      </main>

      <!-- Footer -->
      <footer class="border-t border-zinc-900 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
              <i data-lucide="gamepad-2" class="w-4 h-4 text-zinc-400"></i>
            </div>
            <span class="font-bold text-zinc-400">Unblocked Hub</span>
          </div>
          <p class="text-zinc-600 text-sm">
            © ${new Date().getFullYear()} Unblocked Games Hub. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm text-zinc-500">
            <a href="#" class="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" class="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" class="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <!-- Modal -->
      <div id="modal" class="fixed inset-0 z-50 flex flex-col bg-black ${state.selectedItem ? 'flex' : 'hidden'}">
        ${state.selectedItem ? `
          <div class="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
            <div class="flex items-center gap-4">
              <button id="close-modal-btn" class="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white">
                <i data-lucide="chevron-left" class="w-5 h-5"></i>
              </button>
              <div>
                <h2 class="font-bold text-sm leading-none mb-1">${state.selectedItem.title}</h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">${state.selectedItem.category}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button id="fullscreen-btn" class="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white">
                <i data-lucide="maximize-2" class="w-5 h-5"></i>
              </button>
              <button id="close-modal-x" class="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors text-zinc-400">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
          </div>
          <div class="flex-1 relative bg-zinc-950 ${state.isFullscreen ? 'p-0' : 'p-4 sm:p-8'}">
            <div class="w-full h-full mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 transition-all duration-300 ${state.isFullscreen ? 'max-w-none rounded-none border-none' : 'max-w-5xl'}">
              <iframe
                src="${state.selectedItem.url}"
                class="w-full h-full border-none"
                title="${state.selectedItem.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Re-initialize Lucide icons
  lucide.createIcons();

  // Attach Event Listeners
  document.getElementById('tab-games').onclick = () => { state.activeTab = 'games'; render(); };
  document.getElementById('tab-proxies').onclick = () => { state.activeTab = 'proxies'; render(); };
  
  const searchInput = document.getElementById('search-input');
  searchInput.oninput = (e) => { 
    state.searchQuery = e.target.value; 
    // We don't full render here to keep focus, just update the grid
    updateGrid();
  };
  searchInput.focus();
  searchInput.setSelectionRange(state.searchQuery.length, state.searchQuery.length);

  document.querySelectorAll('.item-card').forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-id');
      const items = state.activeTab === 'games' ? data.games : data.proxies;
      state.selectedItem = items.find(i => i.id === id);
      state.isFullscreen = false;
      render();
    };
  });

  if (state.selectedItem) {
    document.getElementById('close-modal-btn').onclick = closeModal;
    document.getElementById('close-modal-x').onclick = closeModal;
    document.getElementById('fullscreen-btn').onclick = () => {
      state.isFullscreen = !state.isFullscreen;
      render();
    };
  }
}

function updateGrid() {
  // Simple grid update to avoid losing input focus
  const filteredItems = (state.activeTab === 'games' ? data.games : data.proxies).filter(item => 
    item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(state.searchQuery.toLowerCase())
  );
  
  const grid = document.querySelector('.grid');
  if (grid) {
    grid.innerHTML = filteredItems.map(item => `
      <div
        data-id="${item.id}"
        class="item-card group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all"
      >
        <div class="aspect-video relative overflow-hidden">
          <img
            src="${item.thumbnail}"
            alt="${item.title}"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerpolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span class="bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              PLAY NOW <i data-lucide="external-link" class="w-3 h-3"></i>
            </span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between mb-1">
            <h3 class="font-bold text-lg group-hover:text-emerald-400 transition-colors">
              ${item.title}
            </h3>
            <span class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded">
              ${item.category}
            </span>
          </div>
          <p class="text-zinc-500 text-sm line-clamp-2">
            ${item.description}
          </p>
        </div>
      </div>
    `).join('');
    
    lucide.createIcons();
    
    document.querySelectorAll('.item-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-id');
        const items = state.activeTab === 'games' ? data.games : data.proxies;
        state.selectedItem = items.find(i => i.id === id);
        state.isFullscreen = false;
        render();
      };
    });
  }
}

function closeModal() {
  state.selectedItem = null;
  state.isFullscreen = false;
  render();
}

// Initial render
render();
