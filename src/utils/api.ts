import { api } from './apiClient'
import { Comment, Post } from './types'

export const getBlogPosts = () => api.get<Post[]>('/posts')

export const getComments = (postId: string) =>
  api.get<Comment[]>(`/posts/${postId}/comments`)

export const createComment = (comment: Comment, postId: string) =>
  api.post<Comment>(`/posts/${postId}/comments`, comment)
