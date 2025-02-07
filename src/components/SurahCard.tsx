import React from 'react';
import { Book } from 'lucide-react';
import { Surah } from '../types';

interface SurahCardProps {
  surah: Surah;
  onClick: () => void;
}

export function SurahCard({ surah, onClick }: SurahCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
          <Book className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {surah.name.transliteration.en}
            </h3>
            <span className="text-sm text-gray-500">
              {surah.numberOfVerses} ayat
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {surah.name.translation.id}
          </p>
        </div>
      </div>
    </div>
  );
}