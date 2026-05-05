export interface Game {
  id: string;
  url: string;
  name: string;
  description: string;
  instructions: string;
  thumbnail: string;
  categories: string[];
  tags: string[];
  width: number;
  height: number;
  isPortrait: boolean;
  source: 'gamezop' | 'gamedistribution';
}

const GAMEZOP_API_URL = 'https://pub.gamezop.com/v3/games?id=v996vM';
const GAMEDISTRIBUTION_API_URL = 'https://catalog.api.gamedistribution.com/api/v2.0/rss/all/?format=json';

export async function fetchGames(): Promise<Game[]> {
  try {
    // Fetch from GameDistribution (higher quality games as per user request)
    const gdResponse = await fetch(GAMEDISTRIBUTION_API_URL, {
      next: { revalidate: 3600 },
    });
    
    let gdGames: Game[] = [];
    if (gdResponse.ok) {
      const gdData = await gdResponse.json();
      gdGames = gdData.map((g: any) => ({
        id: g.Md5,
        url: g.Url,
        name: g.Title,
        description: g.Description,
        instructions: g.Instructions || '',
        thumbnail: g.Asset?.[0] || '',
        categories: g.Category || [],
        tags: g.Tag || [],
        width: g.Width || 800,
        height: g.Height || 600,
        isPortrait: (g.Height || 600) > (g.Width || 800),
        source: 'gamedistribution'
      }));
    }

    // Fetch from Gamezop
    const gzResponse = await fetch(GAMEZOP_API_URL, {
      next: { revalidate: 3600 },
    });
    
    let gzGames: Game[] = [];
    if (gzResponse.ok) {
      const gzData = await gzResponse.json();
      gzGames = (gzData.games || []).map((g: any) => ({
        id: g.code,
        url: g.url,
        name: g.name.en,
        description: g.description.en,
        instructions: '',
        thumbnail: g.assets.cover,
        categories: g.categories.en,
        tags: g.tags.en,
        width: g.width,
        height: g.height,
        isPortrait: g.isPortrait,
        source: 'gamezop'
      }));
    }

    // Combine and prioritize GameDistribution
    return [...gdGames, ...gzGames];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  const games = await fetchGames();
  return games.find((g) => g.id === id) || null;
}

export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games = await fetchGames();
  const lowerCategory = category.toLowerCase();
  return games.filter((g) => 
    g.categories.some(c => c.toLowerCase() === lowerCategory)
  );
}

export async function searchGames(query: string): Promise<Game[]> {
  const games = await fetchGames();
  const lowerQuery = query.toLowerCase();
  return games.filter((g) => 
    g.name.toLowerCase().includes(lowerQuery) || 
    g.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
    g.categories.some(c => c.toLowerCase().includes(lowerQuery))
  );
}
