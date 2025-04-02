import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Create axios instance with default configs
const api = axios.create({
  baseURL: BASE_URL,
});

// Set auth token for all requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Get all users
export const getUsers = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get posts by user ID
export const getPosts = async (userId, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

// Get comments for a post
export const getComments = async (userId, postId, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/users/${userId}/posts/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};

export default api;
