import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  getRandomPostImage,
  getRandomAvatar,
  formatDate,
} from "../utils/helpers";
import styles from "./PostCard.module.css";

const PostCard = ({ post, user, commentCount }) => {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.header}>
          <Avatar
            src={getRandomAvatar(post.userId)}
            alt={user?.name || "User"}
          />
          <Box className={styles.userInfo}>
            <Typography variant="subtitle1">
              {user?.name || `User ${post.userId}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" className={styles.content}>
          {post.content}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        className={styles.media}
        image={getRandomPostImage(post.id)}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {commentCount !== undefined
            ? `${commentCount} comments`
            : "Loading comments..."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
