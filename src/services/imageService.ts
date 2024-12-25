import axios from 'axios';

interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string;
}

interface ImageSearchParams {
  query: string;
  page?: number;
  perPage?: number;
}

class ImageService {
  private unsplashAccessKey = 'DPecf-PjuntAFCGOFzv_Vw6CNU2Bta49qVhCBkbU2MI';
  private unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization: `Client-ID ${this.unsplashAccessKey}`,
    },
  });

  async searchUnsplashImages({
    query,
    page = 1,
    perPage = 30,
  }: ImageSearchParams): Promise<UnsplashImage[]> {
    try {
      const response = await this.unsplashApi.get('/search/photos', {
        params: {
          query,
          page,
          per_page: perPage,
          orientation: 'landscape',
          content_filter: 'high',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching Unsplash images:', error);
      return [];
    }
  }

  // Fallback images for different categories
  getFallbackImages(category: string): string[] {
    const fallbackImages = {
      portrait: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      ],
      wedding: [
        'https://images.unsplash.com/photo-1519741497674-611481863552',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
      ],
      commercial: [
        'https://images.unsplash.com/photo-1542744095-291d1f67b221',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
      ],
      event: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      ],
    };

    return fallbackImages[category as keyof typeof fallbackImages] || [];
  }
}

export const imageService = new ImageService();
