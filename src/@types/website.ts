export interface IWebsite {
    _id?: string;
    siteUrl: string;
    category: string;
    sites: string;
    type: 'free' | 'paid';
    description: string;
    price: number;
    docs: string;
    video: string;
    images: File[] | string[];
    createdAt?: Date;
    updatedAt?: Date;
  }