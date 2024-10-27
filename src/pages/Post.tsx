import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/utils/apiClient'
import { Post } from '@/utils/types'

function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => api.get<Post>(`/posts/${slug}`),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="text-red-500">
            Error loading post. Please try again later.
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Posts
        </button>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="text-gray-400 text-sm">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            {post.updated_at !== post.created_at && (
              <span className="ml-2">
                (Updated: {new Date(post.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })})
              </span>
            )}
          </div>
        </header>

        {post.description && (
          <div className="mb-8">
            <p className="text-xl text-gray-400">
              {post.description}
            </p>
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  )
}

export default PostPage
