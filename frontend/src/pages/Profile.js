import React from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h2>User Profile</h2>
      <p>Profile page for user ID: {id}</p>
    </div>
  );
}

export default Profile;