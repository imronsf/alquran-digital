import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import { SurahCard } from './components/SurahCard';
import { VerseCard } from './components/VerseCard';
import type { Surah, Verse } from './types';

function App() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      fetchVerses(selectedSurah.number);
    }
  }, [selectedSurah]);

  async function fetchSurahs() {
    try {
      setLoading(true);
      const response = await fetch('https://api.quran.gading.dev/surah');
      const data = await response.json();
      setSurahs(data.data);
    } catch (err) {
      setError('Gagal memuat daftar surah. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchVerses(surahNumber: number) {
    try {
      setLoading(true);
      const response = await fetch(`https://api.quran.gading.dev/surah/${surahNumber}`);
      const data = await response.json();
      setVerses(data.data.verses);
    } catch (err) {
      setError('Gagal memuat ayat-ayat. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }

  const filteredSurahs = surahs.filter((surah) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      surah.name.transliteration.en.toLowerCase().includes(searchLower) ||
      surah.name.translation.id.toLowerCase().includes(searchLower)
    );
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchSurahs();
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (loading && !selectedSurah) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {selectedSurah ? (
          <div>
            <button
              onClick={() => setSelectedSurah(null)}
              className="mb-6 flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Daftar Surah
            </button>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {selectedSurah.name.transliteration.en}
              </h1>
              <p className="text-gray-600">
                {selectedSurah.name.translation.id} • {selectedSurah.numberOfVerses} ayat
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              </div>
            ) : (
              <div className="space-y-6">
                {verses.map((verse) => (
                  <VerseCard key={verse.number.inSurah} verse={verse} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Al-Quran Digital</h1>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSurahs.length > 0 ? (
                filteredSurahs.map((surah) => (
                  <SurahCard
                    key={surah.number}
                    surah={surah}
                    onClick={() => setSelectedSurah(surah)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Tidak ada surah yang ditemukan
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;