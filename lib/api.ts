export interface Game {
  code: string;
  url: string;
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  assets: {
    cover: string;
    thumb: string;
    square: string;
    wall: string;
    brick: string;
  };
  categories: {
    en: string[];
  };
  tags: {
    en: string[];
  };
  rating: number;
  gamePlays: number;
  width: number;
  height: number;
  isPortrait: boolean;
}

const GAMEZOP_API_URL = 'https://pub.gamezop.com/v3/games?id=v996vM';

export async function fetchGames(): Promise<Game[]> {
  try {
    const response = await fetch(GAMEZOP_API_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    
    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  const games = await fetchGames();
  return games.find((g) => g.code === id) || null;
}

export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games = await fetchGames();
  return games.filter((g) => 
    g.categories.en.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

export async function searchGames(query: string): Promise<Game[]> {
  const games = await fetchGames();
  const lowerQuery = query.toLowerCase();
  return games.filter((g) => 
    g.name.en.toLowerCase().includes(lowerQuery) || 
    g.tags.en.some(t => t.toLowerCase().includes(lowerQuery))
  );
}
