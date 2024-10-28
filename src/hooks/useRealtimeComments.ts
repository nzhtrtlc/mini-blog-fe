import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/utils/supabaseClient'
import type { Comment } from '@/utils/types'

export const useRealtimeComments = (postId: string) => {
  const queryClient = useQueryClient()

  console.log('Subscribing to comments for post:', postId)

  useEffect(() => {
    const subscription = supabase
      .channel('db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          //filter: `post_id=eq.${postId}`
        },
        (payload) => {
          console.log('New comment received:', payload)
          const newComment = payload.new as Comment
          queryClient.setQueryData<Comment[]>(['comments', postId], (old) => {
            if (!old) return [newComment]
            return [...old, newComment]
          })
        }
      ).subscribe(status => console.log('Subscription status:', status))

    return () => {
      subscription.unsubscribe()
    }
  }, [postId, queryClient])
}
