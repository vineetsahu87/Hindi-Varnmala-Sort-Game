import React from 'react';
import { GameInterface } from './components/GameInterface';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl hindi-font">
              अ
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">HindiGame</span>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="#" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">Dictionary</a>
             <a href="#" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">About</a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <GameInterface />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Hindi Varnamala Game. Learn with AI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
