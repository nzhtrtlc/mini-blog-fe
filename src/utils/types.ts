export type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}
