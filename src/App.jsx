/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, Globe, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import data from './data.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredItems = useMemo(() => {
    const items = activeTab === 'games' ? data.games : data.proxies;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  const handleOpenItem = (item) => {
    setSelectedItem(item);
    setIsFullscreen(false);
  };

  const closePlayer = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">HUB</span>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games or proxies..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('games')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'games' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Games
            </button>
            <button
              onClick={() => setActiveTab('proxies')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'proxies' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              Proxies
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            {activeTab === 'games' ? 'Featured Games' : 'Web Proxies'}
          </h1>
          <p className="text-zinc-500">
            {activeTab === 'games' 
              ? 'Hand-picked unblocked games for your entertainment.' 
              : 'Secure and fast web proxies to browse freely.'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all"
                onClick={() => handleOpenItem(item)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      PLAY NOW <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
              <Search className="w-8 h-8 text-zinc-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-zinc-500">Try searching for something else.</p>
          </div>
        )}
      </main>

      {/* Iframe Player Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black"
          >
            {/* Player Header */}
            <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={closePlayer}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-bold text-sm leading-none mb-1">{selectedItem.title}</h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">{selectedItem.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={closePlayer}
                  className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className={`flex-1 relative bg-zinc-950 ${isFullscreen ? 'p-0' : 'p-4 sm:p-8'}`}>
              <div className={`w-full h-full mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 transition-all duration-300 ${isFullscreen ? 'max-w-none rounded-none border-none' : 'max-w-5xl'}`}>
                <iframe
                  src={selectedItem.url}
                  className="w-full h-full border-none"
                  title={selectedItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-zinc-400" />
            </div>
            <span className="font-bold text-zinc-400">Unblocked Hub</span>
          </div>
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Unblocked Games Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
