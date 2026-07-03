import { getAllPosts } from '@/lib/posts'
import PostsPageClient from './PostsPageClient'

// server component: fetches data, delegates rendering + search UI to the client component
const Posts = async () => {
  const posts = await getAllPosts()

  return <PostsPageClient posts={posts} />
}

export default Posts
