import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PostCard from "./PostCard";
import { getUsers, getPosts } from "../services/api";
import styles from "./Feed.module.css";

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef(null);

  const fetchAllData = async () => {
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

      // Using Promise.all for concurrent fetching
      await Promise.all(
        users.map(async (user) => {
          try {
            const userPosts = await getPosts(user.id, token);
            allPosts = [...allPosts, ...userPosts];
          } catch (error) {
            console.error(`Error fetching posts for user ${user.id}:`, error);
          }
        })
      );

      // Sort posts by creation time (newest first)
      const sortedPosts = allPosts.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.id - a.id; // Fallback to ID if createdAt is not available
      });

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    // Set up interval to refresh feed every 30 seconds
    refreshIntervalRef.current = setInterval(() => {
      fetchAllData();
    }, 30000);

    // Clean up interval on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [token]);

  const handleRefresh = () => {
    setLoading(true);
    fetchAllData();
  };

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" component="h1">
          Latest Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          className={styles.refreshButton}
        >
          Refresh
        </Button>
      </Box>

      <div className={styles.feedContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} user={usersMap[post.userId]} />
          ))
        ) : (
          <Typography variant="body1">No posts found.</Typography>
        )}
      </div>
    </Box>
  );
};

export default Feed;
