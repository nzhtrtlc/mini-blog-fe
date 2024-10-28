import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { createComment } from '../utils/api'
import { Comment } from '../utils/types'

// Zod schema
const commentSchema = z.object({
  author_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(500, 'Comment must be less than 500 characters'),
})

type CommentFormData = z.infer<typeof commentSchema>;
type CreateCommentDTO = Pick<Comment, 'author_name' | 'content'>;

export const CommentForm = ({ postId }: { postId: string }) => {
  const [errors, setErrors] = useState<Partial<CommentFormData>>({})
  const [formData, setFormData] = useState<CommentFormData>({
    author_name: '',
    content: '',
  })

  const queryClient = useQueryClient()

  const mutation = useMutation<Comment, Error, CreateCommentDTO>({
    mutationFn: (commentData) => createComment(commentData as Comment, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setFormData({ author_name: '', content: '' })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      // Validate form data
      const validatedData = commentSchema.parse(formData)
      // Mutation'ı çağır
      mutation.mutate(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<CommentFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof CommentFormData] = err.message
          }
        })
        setErrors(formErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="author_name" className="block text-sm font-medium text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="author_name"
          value={formData.author_name}
          onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
          disabled={mutation.isPending}
        />
        {errors.author_name && (
          <p className="mt-1 text-sm text-red-500">{errors.author_name}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
          Comment
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your comment here..."
          disabled={mutation.isPending}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      {mutation.isError && (
        <div className="text-red-500">
          Error submitting comment. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-blue-950 text-white/70 rounded-md hover:bg-blue-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  )
}
