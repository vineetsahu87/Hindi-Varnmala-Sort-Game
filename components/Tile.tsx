import React from 'react';
import { Letter } from '../types';
import { GripVertical, Volume2 } from 'lucide-react';

interface TileProps {
  letter: Letter;
  index: number;
  isSelected: boolean;
  isCorrectPosition?: boolean; // Only shown when game is won or checking
  showHints: boolean;
  onSelect: (index: number) => void;
  onDropHover: (dragIndex: number, hoverIndex: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onPlayAudio: (letter: Letter) => void;
}

export const Tile: React.FC<TileProps> = ({
  letter,
  index,
  isSelected,
  isCorrectPosition,
  showHints,
  onSelect,
  onDragStart,
  onDrop,
  onPlayAudio
}) => {
  
  // Determine background color based on state
  let bgClass = "bg-white hover:bg-orange-50";
  let borderClass = "border-slate-200";
  let textClass = "text-slate-800";

  if (isSelected) {
    bgClass = "bg-orange-100 ring-2 ring-orange-400";
    borderClass = "border-orange-400";
  } else if (showHints && isCorrectPosition === true) {
    bgClass = "bg-green-100";
    borderClass = "border-green-400";
    textClass = "text-green-800";
  } else if (showHints && isCorrectPosition === false) {
    bgClass = "bg-red-50";
    borderClass = "border-red-300";
    textClass = "text-red-800";
  }

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the tile when clicking audio
    onPlayAudio(letter);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()} // Allow drop
      onDrop={(e) => onDrop(e, index)}
      onClick={() => onSelect(index)}
      className={`
        relative 
        w-24 h-32 sm:w-28 sm:h-36 
        rounded-xl shadow-sm border-2 
        flex flex-col items-center justify-center 
        cursor-grab active:cursor-grabbing 
        transition-all duration-200 
        transform hover:-translate-y-1
        group
        ${bgClass} ${borderClass}
      `}
    >
      {/* Audio Button */}
      <button 
        onClick={handleAudioClick}
        className="absolute top-2 left-2 p-1.5 rounded-full bg-white/50 hover:bg-orange-100 text-slate-500 hover:text-orange-600 transition-colors opacity-60 group-hover:opacity-100"
        title="Listen"
      >
        <Volume2 size={14} />
      </button>

      {/* Drag Handle Icon for visual affordance */}
      <div className="absolute top-2 right-2 opacity-20">
        <GripVertical size={14} />
      </div>

      {/* Main Hindi Character */}
      <div className="flex flex-col items-center">
        <span className={`hindi-font text-4xl sm:text-5xl font-bold ${textClass} mb-1`}>
          {letter.char}
        </span>
        
        {/* Example Word */}
        <span className="text-xs text-slate-500 font-medium hindi-font mt-1">
           {letter.char} से {letter.exampleHindi}
        </span>
      </div>
      
      {/* Visual Indicator for correct/wrong during checking phase */}
      {showHints && (
        <div className={`absolute -bottom-2 px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider text-white ${isCorrectPosition ? 'bg-green-500' : 'bg-red-500'}`}>
          {isCorrectPosition ? 'Correct' : 'Wrong'}
        </div>
      )}
    </div>
  );
};
