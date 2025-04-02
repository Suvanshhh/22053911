import React, { useState, useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import UserCard from "./UserCard";
import { getUsers, getPosts } from "../services/api";
import styles from "./TopUsers.module.css";

const TopUsers = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [usersWithPostCount, setUsersWithPostCount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        // Fetch all users
        const fetchedUsers = await getUsers(token);
        setUsers(fetchedUsers);

        // Get post counts for each user
        const userPostCounts = {};

        // Using Promise.all to fetch posts concurrently
        await Promise.all(
          fetchedUsers.map(async (user) => {
            try {
              const posts = await getPosts(user.id, token);
              userPostCounts[user.id] = posts.length;
            } catch (error) {
              console.error(`Error fetching posts for user ${user.id}:`, error);
              userPostCounts[user.id] = 0;
            }
          })
        );

        // Create enhanced users array with post counts
        const enhancedUsers = fetchedUsers.map((user) => ({
          ...user,
          postCount: userPostCounts[user.id] || 0,
        }));

        // Sort by post count (highest first) and take top 5
        const topUsers = enhancedUsers
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);

        setUsersWithPostCount(topUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
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
        Top 5 Users by Post Count
      </Typography>

      {usersWithPostCount.length > 0 ? (
        usersWithPostCount.map((user) => (
          <UserCard key={user.id} user={user} postCount={user.postCount} />
        ))
      ) : (
        <Typography variant="body1">No users found.</Typography>
      )}
    </Box>
  );
};

export default TopUsers;
