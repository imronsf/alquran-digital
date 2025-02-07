import React from 'react';
import { Verse } from '../types';

interface VerseCardProps {
  verse: Verse;
}

export function VerseCard({ verse }: VerseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-600">
          {verse.number.inSurah}
        </span>
        {verse.audio.primary && (
          <audio controls className="w-64">
            <source src={verse.audio.primary} type="audio/mpeg" />
          </audio>
        )}
      </div>
      
      <p className="text-right text-2xl leading-loose font-arabic">
        {verse.text.arab}
      </p>
      
      <p className="text-gray-600 italic">
        {verse.text.transliteration.en}
      </p>
      
      <p className="text-gray-800">
        {verse.translation.id}
      </p>
    </div>
  );
}