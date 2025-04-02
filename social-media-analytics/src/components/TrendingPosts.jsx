import React, { useState, useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import PostCard from "./PostCard";
import { getUsers, getPosts, getComments } from "../services/api";
import styles from "./TrendingPosts.module.css";

const TrendingPosts = ({ token }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const users = await getUsers(token);

        // Create user map for easy lookup
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        setUsersMap(userMap);

        // Fetch posts for all users
        let allPosts = [];
        let postCommentCounts = {};

        // Using Promise.all for concurrent fetching
        await Promise.all(
          users.map(async (user) => {
            try {
              const posts = await getPosts(user.id, token);
              allPosts = [...allPosts, ...posts];

              // Fetch comment counts for each post
              await Promise.all(
                posts.map(async (post) => {
                  try {
                    const comments = await getComments(user.id, post.id, token);
                    postCommentCounts[post.id] = comments.length;
                  } catch (error) {
                    console.error(
                      `Error fetching comments for post ${post.id}:`,
                      error
                    );
                    postCommentCounts[post.id] = 0;
                  }
                })
              );
            } catch (error) {
              console.error(`Error fetching posts for user ${user.id}:`, error);
            }
          })
        );

        // Enhance posts with comment count
        const enhancedPosts = allPosts.map((post) => ({
          ...post,
          commentCount: postCommentCounts[post.id] || 0,
        }));

        // Sort by comment count (highest first)
        const sortedPosts = enhancedPosts.sort(
          (a, b) => b.commentCount - a.commentCount
        );

        setTrendingPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Trending Posts (Most Comments)
      </Typography>

      {trendingPosts.length > 0 ? (
        trendingPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={usersMap[post.userId]}
            commentCount={post.commentCount}
          />
        ))
      ) : (
        <Typography variant="body1">No posts found.</Typography>
      )}
    </Box>
  );
};

export default TrendingPosts;
