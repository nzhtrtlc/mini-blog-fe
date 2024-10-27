import { Link } from 'react-router-dom'

type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published';
}

function Home() {
  const posts: Post[] = [
    {
      id: '1',
      title: 'Promises From The Ground Up',
      description: `The "Promises" API is a surprisingly tricky part of modern JavaScript. Without the right context, it doesn't make much sense at all! In this tutorial, you'll build an intuition for how Promises work by getting a deeper understanding of JavaScript and its limitations.`,
      slug: 'promises-in-detail',
      status: 'published'
    },
    {
      id: '2',
      title: 'Statements Vs. Expressions',
      description: 'One of the most foundational things to understand about JavaScript is that programs are made up of statements, and statements have slots for expressions. In this blog post, we\'ll dig into how these two structures work, and see how building an intuition about this can help us solve practical problems.',
      slug: 'what-is-react',
      status: 'published'
    },
    {
      id: '3',
      title: 'What is React?',
      description: 'We are breaking down deeply in react.',
      slug: 'what-is-react',
      status: 'published'
    },
    {
      id: '4',
      title: 'What is React?',
      description: 'We are breaking down deeply in react.',
      slug: 'what-is-react',
      status: 'published'
    },
  ]

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">React</h1>
          <span className="text-gray-400">{posts.length} Articles</span>
        </div>

        {/* Blog Grid - padding'i buradan kaldırdık */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
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
        </div>
      </div>
    </div>
  )
}

export default Home
