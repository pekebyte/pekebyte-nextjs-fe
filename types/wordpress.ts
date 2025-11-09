export interface ACFImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ACFImageTwo {
  source_url: string;
  alt_text: string;
  media_type: string;
}

export interface PortfolioFeature {
  feature: string;
}

export interface PortfolioTechnology {
  technology: string;
}

export interface PortfolioItem {
  id: number;
  slug: string;
  categories: number[];
  title: {
    rendered: string;
  };
  'portfolio-category'?: number[];
  acf: {
    category: string;
    description: string;
    short_description: string;
    technologies: PortfolioTechnology[];
    image: number;
    gallery?: number[];
    demo_link?: string;
    github_link?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    ogimage?: number;
    features?: PortfolioFeature[];
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    
  };
}

export interface Tutorial {
  id: number | ACFImageTwo | null;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    category: string;
    description: string;
    duration: string;
    nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
    thumbnail: number;
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
