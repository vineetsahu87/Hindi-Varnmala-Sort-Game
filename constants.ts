import { LevelData } from './types';

export const LETTER_EXAMPLES: Record<string, { hindi: string, english: string }> = {
  // Vowels
  'अ': { hindi: 'अनार', english: 'Anar' },
  'आ': { hindi: 'आम', english: 'Aam' },
  'इ': { hindi: 'इमली', english: 'Imli' },
  'ई': { hindi: 'ईख', english: 'Eekh' },
  'उ': { hindi: 'उल्लू', english: 'Ullu' },
  'ऊ': { hindi: 'ऊन', english: 'Oon' },
  'ऋ': { hindi: 'ऋषि', english: 'Rishi' },
  'ए': { hindi: 'एड़ी', english: 'Edi' },
  'ऐ': { hindi: 'ऐनक', english: 'Ainak' },
  'ओ': { hindi: 'ओखली', english: 'Okhli' },
  'औ': { hindi: 'औरत', english: 'Aurat' },
  'अं': { hindi: 'अंगूर', english: 'Angoor' },
  'अः': { hindi: 'खाली', english: 'Khali' },
  
  // Consonants
  'क': { hindi: 'कबूतर', english: 'Kabutar' },
  'ख': { hindi: 'खरगोश', english: 'Khargosh' },
  'ग': { hindi: 'गमला', english: 'Gamla' },
  'घ': { hindi: 'घड़ी', english: 'Ghadi' },
  'ङ': { hindi: 'खाली', english: 'Khali' },

  'च': { hindi: 'चम्मच', english: 'Chamach' },
  'छ': { hindi: 'छतरी', english: 'Chatri' },
  'ज': { hindi: 'जहाज', english: 'Jahaj' },
  'झ': { hindi: 'झंडा', english: 'Jhanda' },
  'ञ': { hindi: 'खाली', english: 'Khali' },

  'ट': { hindi: 'टमाटर', english: 'Tamatar' },
  'ठ': { hindi: 'ठठेरा', english: 'Thathera' },
  'ड': { hindi: 'डमरू', english: 'Damru' },
  'ढ': { hindi: 'ढक्कन', english: 'Dhakkan' },
  'ण': { hindi: 'खाली', english: 'Khali' },

  'त': { hindi: 'तरबूज', english: 'Tarbooj' },
  'थ': { hindi: 'थर्मस', english: 'Thermos' },
  'द': { hindi: 'दवात', english: 'Davaat' },
  'ध': { hindi: 'धनुष', english: 'Dhanush' },
  'न': { hindi: 'नल', english: 'Nal' },

  'प': { hindi: 'पतंग', english: 'Patang' },
  'फ': { hindi: 'फल', english: 'Phal' },
  'ब': { hindi: 'बतख', english: 'Batakh' },
  'भ': { hindi: 'भालू', english: 'Bhalu' },
  'म': { hindi: 'मछली', english: 'Machli' },

  'य': { hindi: 'यज्ञ', english: 'Yagya' },
  'र': { hindi: 'रथ', english: 'Rath' },
  'ल': { hindi: 'लट्टू', english: 'Lattoo' },
  'व': { hindi: 'वक', english: 'Vak' },

  'श': { hindi: 'शलजम', english: 'Shaljam' },
  'ष': { hindi: 'षट्कोण', english: 'Shatkon' },
  'स': { hindi: 'सपेरा', english: 'Sapera' },
  'ह': { hindi: 'हल', english: 'Hal' },

  // Conjuncts
  'क्ष': { hindi: 'क्षत्रिय', english: 'Kshatriya' },
  'त्र': { hindi: 'त्रिशूल', english: 'Trishul' },
  'ज्ञ': { hindi: 'ज्ञानी', english: 'Gyani' },
  'श्र': { hindi: 'श्रमिक', english: 'Shramik' }
};

export const LEVELS: LevelData[] = [
  {
    id: 'swar',
    title: 'Swar (Vowels)',
    category: 'Vowels',
    description: 'Arrange the vowels from अ to अः',
    letters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः']
  },
  {
    id: 'k-varga',
    title: 'K-Varga (Gutturals)',
    category: 'Consonants',
    description: 'Throat sounds: क to ङ',
    letters: ['क', 'ख', 'ग', 'घ', 'ङ']
  },
  {
    id: 'ch-varga',
    title: 'Ch-Varga (Palatals)',
    category: 'Consonants',
    description: 'Palate sounds: च to ञ',
    letters: ['च', 'छ', 'ज', 'झ', 'ञ']
  },
  {
    id: 't-varga-retro',
    title: 'T-Varga (Retroflex)',
    category: 'Consonants',
    description: 'Roof of mouth: ट to ण',
    letters: ['ट', 'ठ', 'ड', 'ढ', 'ण']
  },
  {
    id: 't-varga-dental',
    title: 'T-Varga (Dental)',
    category: 'Consonants',
    description: 'Teeth sounds: त to न',
    letters: ['त', 'थ', 'द', 'ध', 'न']
  },
  {
    id: 'p-varga',
    title: 'P-Varga (Labials)',
    category: 'Consonants',
    description: 'Lip sounds: प to म',
    letters: ['प', 'फ', 'ब', 'भ', 'म']
  },
  {
    id: 'anthastha',
    title: 'Anthastha (Semi-vowels)',
    category: 'Consonants',
    description: 'Inner sounds: य to व',
    letters: ['य', 'र', 'ल', 'व']
  },
  {
    id: 'usm',
    title: 'Usm (Sibilants)',
    category: 'Consonants',
    description: 'Warm breath sounds: श to ह',
    letters: ['श', 'ष', 'स', 'ह']
  },
  {
    id: 'sanyukt',
    title: 'Sanyukt (Conjuncts)',
    category: 'Combined',
    description: 'Combined letters: क्ष to श्र',
    letters: ['क्ष', 'त्र', 'ज्ञ', 'श्र']
  }
];
