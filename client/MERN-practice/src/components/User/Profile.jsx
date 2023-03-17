import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      {/* Display other user data here */}
    </div>
  );
};

export default Profile;
