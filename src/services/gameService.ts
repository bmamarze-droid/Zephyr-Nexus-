import { Game } from '../types';

const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    description: 'An open-world, action-adventure story set in Night City.',
    rating: 4.5,
    demoAvailable: true,
  },
  {
    id: '2',
    title: 'Elden Ring',
    genre: 'Action RPG',
    description: 'A dark fantasy action-RPG created by FromSoftware.',
    rating: 4.9,
    demoAvailable: false,
  },
  {
    id: '3',
    title: 'Hades II',
    genre: 'Rogue-like',
    description: 'Battle beyond the Underworld using dark magic to take on Chronos.',
    rating: 4.8,
    demoAvailable: true,
  },
];

export const gameService = {
  getFeaturedGames: async (): Promise<Game[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GAMES), 300);
    });
  },

  getGameById: async (id: string): Promise<Game | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GAMES.find((g) => g.id === id)), 200);
    });
  },
};
export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  reviewsCount: string;
  description: string;
  tags: string[];
  bannerUrl: string;
}

export interface Hub {
  id: string;
  slug: string;
  name: string;
  members: string;
  category: string;
}

const GAMES_DATA: Game[] = [
  {
    id: 'cyber-odyssey',
    title: 'Cyber Odyssey 2077',
    genre: 'Action RPG / Sci-Fi',
    rating: 4.8,
    reviewsCount: '1.2k',
    description: 'Explore a sprawling neon-lit metropolis, upgrade cybernetics, and engage in high-octane tactical combat in this immersive open-world adventure.',
    tags: ['Single Player', 'Open World', 'Cyberpunk', 'Co-op'],
    bannerUrl: 'https://via.placeholder.com/600x300/1e1e2e/89b4fa?text=Cyber+Odyssey',
  },
  {
    id: 'neon-drift',
    title: 'Neon Drift: Zenith',
    genre: 'Arcade Racing',
    rating: 4.6,
    reviewsCount: '850',
    description: 'High-speed synthwave racing through futuristic cityscapes featuring real-time multiplayer drifting mechanics.',
    tags: ['Multiplayer', 'Racing', 'Synthwave'],
    bannerUrl: 'https://via.placeholder.com/600x300/1e1e2e/89b4fa?text=Neon+Drift',
  },
];

export const getGames = (): Game[] => GAMES_DATA;

export const getGameById = (id: string): Game | undefined => {
  return GAMES_DATA.find((game) => game.id === id);
};

