import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS, LETTER_EXAMPLES } from '../constants';
import { LevelData, Letter, GameStatus } from '../types';
import { Tile } from './Tile';
import { getTutorHelp } from '../services/geminiService';
import { RefreshCw, CheckCircle2, BrainCircuit, ArrowRight, Trophy, AlertCircle, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const GameInterface: React.FC = () => {
  const [currentLevelId, setCurrentLevelId] = useState<string>(LEVELS[0].id);
  const [items, setItems] = useState<Letter[]>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tutorContent, setTutorContent] = useState<string>("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  
  // New State for validation
  const [retries, setRetries] = useState(3);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentLevel = LEVELS.find(l => l.id === currentLevelId) || LEVELS[0];

  // Initialize level
  const initLevel = useCallback((level: LevelData) => {
    const originalLetters = level.letters;
    // Create letter objects
    const letterObjects: Letter[] = originalLetters.map((char, index) => {
      const exampleData = LETTER_EXAMPLES[char] || { hindi: '', english: '' };
      return {
        id: `${level.id}-${char}`,
        char,
        correctIndex: index,
        example: exampleData.english,
        exampleHindi: exampleData.hindi
      };
    });
    
    // Shuffle
    const shuffled = [...letterObjects].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setStatus(GameStatus.PLAYING);
    setSelectedIndex(null);
    setRetries(3);
    setShowFeedback(false);
    setTutorContent("");
    setShowTutor(false);
  }, []);

  useEffect(() => {
    initLevel(currentLevel);
  }, [currentLevel, initLevel]);

  // Handle Swap logic
  const swapItems = (index1: number, index2: number) => {
    // Reset feedback when user interacts to let them try again cleanly
    if (status === GameStatus.PLAYING) {
      setShowFeedback(false);
    }
    
    const newItems = [...items];
    const temp = newItems[index1];
    newItems[index1] = newItems[index2];
    newItems[index2] = temp;
    setItems(newItems);
  };

  // Check Answer Logic
  const handleCheckAnswer = () => {
    if (status !== GameStatus.PLAYING) return;

    const isCorrect = items.every((item, index) => item.correctIndex === index);

    if (isCorrect) {
      setStatus(GameStatus.WON);
      setShowFeedback(true);
      playSoundText("बहुत बढ़िया! (Excellent!)");
    } else {
      setShowFeedback(true);
      const newRetries = retries - 1;
      setRetries(newRetries);

      if (newRetries <= 0) {
        setStatus(GameStatus.LOST);
        playSoundText("Correct answer is here.");
        // Auto reveal correct order after a brief moment to show what was wrong
        setTimeout(() => {
           const sorted = [...items].sort((a, b) => a.correctIndex - b.correctIndex);
           setItems(sorted);
        }, 1200);
      } else {
        playSoundText("Try again");
      }
    }
  };

  // Generic text speaker
  const playSoundText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Letter speaker
  const playLetterSound = (letter: Letter) => {
    const textToSpeak = `${letter.char} से ${letter.exampleHindi}`;
    playSoundText(textToSpeak);
  };

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (status === GameStatus.WON || status === GameStatus.LOST) return;
    e.dataTransfer.setData('text/plain', index.toString());
    setSelectedIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (status === GameStatus.WON || status === GameStatus.LOST) return;
    e.preventDefault();
    const dragIndexStr = e.dataTransfer.getData('text/plain');
    if (!dragIndexStr) return;
    
    const dragIndex = parseInt(dragIndexStr, 10);
    if (dragIndex === dropIndex) return;

    swapItems(dragIndex, dropIndex);
    setSelectedIndex(null);
  };

  // Click handler for mobile
  const handleSelect = (index: number) => {
    if (status === GameStatus.WON || status === GameStatus.LOST) return;

    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null); // Deselect
    } else {
      swapItems(selectedIndex, index);
      setSelectedIndex(null);
    }
  };

  const handleTutorRequest = async () => {
    setShowTutor(true);
    if (!tutorContent) {
      setIsTutorLoading(true);
      const helpText = await getTutorHelp(currentLevel.letters, currentLevel.description);
      setTutorContent(helpText);
      setIsTutorLoading(false);
    }
  };

  const handleNextLevel = () => {
    const currentIndex = LEVELS.findIndex(l => l.id === currentLevelId);
    const nextLevel = LEVELS[(currentIndex + 1) % LEVELS.length];
    setCurrentLevelId(nextLevel.id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <span className="hindi-font text-orange-600">वर्णमाला</span> (Varnamala)
          </h1>
          <p className="text-slate-500 mt-1">Arrange the Hindi alphabets in the correct sequence.</p>
        </div>

        <div className="flex gap-2">
          <select 
            value={currentLevelId}
            onChange={(e) => setCurrentLevelId(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
          >
            {LEVELS.map(l => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
          <button 
            onClick={() => initLevel(currentLevel)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title="Reset Level"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Game Board */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            
            {/* Header with Retries */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
                  {currentLevel.title}
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full uppercase tracking-wide">
                    {currentLevel.category}
                  </span>
                </h2>
                <p className="text-slate-500 text-sm mt-1">{currentLevel.description}</p>
              </div>
              
              {status === GameStatus.PLAYING && (
                <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase mr-1">Retries</span>
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      size={16} 
                      className={`${i < retries ? 'text-red-500 fill-red-500' : 'text-slate-300'} transition-colors`} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* The Grid */}
            <div className="flex flex-wrap gap-4 justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 min-h-[200px] mb-6">
              {items.map((item, index) => (
                <Tile
                  key={item.id}
                  index={index}
                  letter={item}
                  isSelected={selectedIndex === index}
                  isCorrectPosition={item.correctIndex === index}
                  showHints={showFeedback || status === GameStatus.WON || status === GameStatus.LOST}
                  onSelect={handleSelect}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                  onDropHover={() => {}}
                  onPlayAudio={playLetterSound}
                />
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex justify-center">
              {status === GameStatus.PLAYING && (
                <button
                  onClick={handleCheckAnswer}
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Check Order
                </button>
              )}
            </div>

            {/* Results: WON */}
            {status === GameStatus.WON && (
              <div className="mt-4 p-6 bg-green-50 border border-green-100 rounded-xl flex flex-col items-center text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Trophy size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Excellent Work!</h3>
                <p className="text-green-700 mb-6">You have correctly arranged the sequence.</p>
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  Next Level <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Results: LOST */}
            {status === GameStatus.LOST && (
              <div className="mt-4 p-6 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center text-center animate-fade-in">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Out of attempts!</h3>
                <p className="text-red-700 mb-6">The correct order has been revealed above.</p>
                <button
                  onClick={() => initLevel(currentLevel)}
                  className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <RefreshCw size={18} /> Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Tutor & Tools */}
        <div className="lg:col-span-1 space-y-6">
          {/* Action Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BrainCircuit className="text-indigo-500" size={20} />
              AI Learning Assistant
            </h3>
            
            {!showTutor ? (
               <div className="text-center py-8">
                 <p className="text-sm text-slate-500 mb-4">Stuck? Ask Gemini for pronunciation tips and mnemonics.</p>
                 <button
                  onClick={handleTutorRequest}
                  className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg transition-colors border border-indigo-200 flex items-center justify-center gap-2"
                >
                  <BrainCircuit size={18} />
                  Ask AI Tutor
                </button>
               </div>
            ) : (
              <div className="animate-in fade-in zoom-in duration-300">
                {isTutorLoading ? (
                  <div className="space-y-3 py-4">
                    <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="prose prose-sm prose-slate max-w-none max-h-[500px] overflow-y-auto pr-2">
                     <ReactMarkdown>{tutorContent}</ReactMarkdown>
                  </div>
                )}
                 <button
                  onClick={() => setShowTutor(false)}
                  className="mt-4 text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Close Assistant
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats or Tips */}
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
             <h4 className="text-orange-800 font-medium mb-2 flex items-center gap-2">
              <CheckCircle2 size={16}/> How to Play
             </h4>
             <ul className="text-sm text-orange-700 space-y-2 list-disc pl-4">
                <li>Drag and drop tiles to rearrange them.</li>
                <li>Tap the 🔊 icon to hear: "<b>च</b> से <b>चम्मच</b>"</li>
                <li>Click "Check Order" when you are done.</li>
                <li>You have 3 attempts before the answer is revealed.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
