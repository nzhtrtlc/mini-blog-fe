import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '@/utils/api'
import { Post } from '@/utils/types'
import { MultiplePostLoading } from '@/components/SkeletonLoader'

function Home() {

  const { data: blogPosts, isLoading } = useQuery<Post[]>({
    queryKey: ['getBlogPosts'],
    queryFn: getBlogPosts
  })

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">React</h1>
          {blogPosts && <span className="text-gray-400">{blogPosts.length} Articles</span>}
        </div>

        {isLoading && <MultiplePostLoading rows={4}/>}

        {blogPosts && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {blogPosts.map((post: Post) => (
            <div key={post.id} className="w-full px-4 sm:px-6 lg:px-8">
              <article
                className="p-6 rounded-lg bg-gray-900 border border-gray-800 h-full transition-all duration-300 hover:border-gray-700">
                <Link
                  to={`/post/${post.slug}`}
                  className="block"
                >
                  <h2 className="text-2xl font-bold mb-3 hover:text-gray-300 transition-colors duration-200">
                    {post.title}
                  </h2>
                </Link>

                {post.description && (
                  <p className="text-gray-400 mb-4 line-clamp-4">
                    {post.description}
                  </p>
                )}

                <Link
                  to={`/post/${post.slug}`}
                  className="inline-block"
                >
                  <span className="text-gray-400 hover:text-white transition-colors duration-200">
                    Read more
                  </span>
                </Link>
              </article>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Home
