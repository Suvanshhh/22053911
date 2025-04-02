import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { getRandomAvatar } from "../utils/helpers";
import styles from "./UserCard.module.css";

const UserCard = ({ user, postCount }) => {
  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        className={styles.avatar}
        image={getRandomAvatar(user.id)}
        alt={user.name}
      />
      <Box className={styles.content}>
        <CardContent>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            User ID: {user.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Posts: {postCount}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;
