import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UsersList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-list">
      <h2>Top Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user.id, user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
