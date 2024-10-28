import { useQuery } from '@tanstack/react-query'
import { getComments } from '@/utils/api'
import { Comment } from '@/utils/types'
import { useRealtimeComments } from '@/hooks/useRealtimeComments'


export const CommentList = ({ postId }: { postId: string }) => {
  const { data: comments, isLoading, error } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId)
  })

  useRealtimeComments(postId)

  console.log('Current comments:', comments);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"/>
            <div className="h-4 bg-gray-700 rounded w-full"/>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading comments. Please try again later.
      </div>
    )
  }

  if (!comments?.length) {
    return (
      <div className="text-gray-400">
        No comments yet. Be the first to comment!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments?.map((comment: Comment) => (
        <article key={comment.id} className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">{comment.author_name}</h3>
            <time className="text-sm text-gray-400">
              {new Date(comment.created_at).toLocaleDateString()}
            </time>
          </div>
          <p className="text-gray-300">{comment.content}</p>
        </article>
      ))}
    </div>
  )
}
