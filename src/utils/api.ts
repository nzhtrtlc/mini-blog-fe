import { api } from './apiClient.ts'
import { Post } from './types.ts'

export const getBlogPosts = () => api.get<Post[]>('/posts')
