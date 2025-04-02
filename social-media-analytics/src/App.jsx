import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import styles from './App.module.css';

function App() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would get this from your authentication process
    // Using the token from your image
    const fetchToken = async () => {
      try {
        // This is the token from your API response image
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYWBC5GFpkXHiQrsiZXhwIjoxNzQzNzk3NDQ0LCJpZCI6IlRhZWh5dW5nIiwib3JnIjoiYWlydGVsIn0.LTZbKjtNNRhNS84ZDU5LTHmJJ12mENTzKV5sInUYiisinjJmwtydXNpcmFAYMJjLmVkdSJ9LCJJ0WFpbCI6ImFzdWJiYXJhbUBnbWFpbC5jb20iLCJpYXQiOjE2Gx3ByTiJm9YN0c29kc25ib1VjTGFMFMjVjIIwYVM3ZWEzQzk2ZSi6ImhQX0JQQ1dmYWVjioII9Tm3vTQjlLWEyWyRWGEiLTRhNTk0GIxY3VmVaTkhRzjpVmFuZzFLT2fndjI3TmdJbIJTa9.vAkD9Seg3DfU_6Ww7JMF+mAuFximHLTm7AiCLDcLAzVg";
        setToken(accessToken);
      } catch (error) {
        console.error('Failed to get access token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <Container maxWidth="lg" className={styles.container}>
          <Routes>
            <Route path="/" element={<Feed token={token} />} />
            <Route path="/top-users" element={<TopUsers token={token} />} />
            <Route path="/trending-posts" element={<TrendingPosts token={token} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
