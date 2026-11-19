export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  excerpt?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface FileDocument {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'audio';
  created_at?: Date;
}

export interface BlogFormData {
  title: string;
  category: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  cover_image: string;
}
