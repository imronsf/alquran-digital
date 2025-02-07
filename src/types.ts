export interface Surah {
  number: number;
  sequence: number;
  numberOfVerses: number;
  name: {
    short: string;
    transliteration: {
      id: string;
      en: string;
    };
    translation: {
      id: string;
      en: string;
    };
  };
  revelation: {
    arab: string;
    id: string;
    en: string;
  };
  tafsir: {
    id: string;
  };
}

export interface Verse {
  number: {
    inQuran: number;
    inSurah: number;
  };
  meta: {
    juz: number;
    page: number;
    manzil: number;
    ruku: number;
    hizbQuarter: number;
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    id: string;
    en: string;
  };
  audio: {
    primary: string;
    secondary: string[];
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
}