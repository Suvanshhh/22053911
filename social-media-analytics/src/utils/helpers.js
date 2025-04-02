// Generate random avatar URL
export const getRandomAvatar = (userId) => {
  return `https://i.pravatar.cc/150?img=${userId % 70}`;
};

// Generate random image URL for posts
export const getRandomPostImage = (postId) => {
  return `https://picsum.photos/500/300?random=${postId}`;
};

// Format date from timestamp
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Sort posts by creation time (newest first)
export const sortPostsByCreationTime = (posts) => {
  return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Get top users by post count
export const getTopUsersByPostCount = (users, postsMap) => {
  return [...users]
    .map(user => ({
      ...user,
      postCount: postsMap[user.id]?.length || 0
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);
};

// Get posts with most comments
export const getPostsWithMostComments = (posts, commentsMap) => {
  return [...posts]
    .map(post => ({
      ...post,
      commentCount: commentsMap[post.id]?.length || 0
    }))
    .sort((a, b) => b.commentCount - a.commentCount);
};
