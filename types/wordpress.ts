export interface ACFImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioItem {
  id: number;
  slug: string;
  categories: number[];
  title: {
    rendered: string;
  };
  acf: {
    category: string;
    description: string;
    short_description: string;
    technologies: string[];
    image: ACFImage;
    gallery?: ACFImage[];
    features?: string[];
    demo_link?: string;
    github_link?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Tutorial {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    category: string;
    description: string;
    duration: string;
    level: 'Principiante' | 'Intermedio' | 'Avanzado';
    thumbnail: ACFImage;
    video_id?: string;
    content?: string;
    topics?: string[];
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Page {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: Record<string, any>;
}
