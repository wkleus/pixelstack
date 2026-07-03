import { getRecentPosts } from '@/lib/posts'
import PostsView from './PostsView'

// server component: fetches 3 most recent published posts for homepage teaser
const Posts = async () => {
  const posts = await getRecentPosts(3)

  return <PostsView posts={posts} />
}

export default Posts
