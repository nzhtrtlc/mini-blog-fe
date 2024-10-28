export type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const queryKeys = {
  comments: (postId: string) => ["comments", postId] as const,
};
