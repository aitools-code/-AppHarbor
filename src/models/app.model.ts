

export interface App {
  id: number;
  name: string;
  category: string;
  rating: number;
  downloads: string;
  iconUrl: string;
  description: string;
  developer: string;
  platform: 'Mobile' | 'Desktop' | 'Tablet';
  screenshots: string[];
  publisherId?: string;
}
