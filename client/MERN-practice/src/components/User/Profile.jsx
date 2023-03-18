import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        navigate('/login');
      }
      try {
        const response = await fetch(`http://localhost:8082/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }

  return (
    <div>
      <Link to='/'>
      <button>Home</button>
      </Link>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      <button onClick={handleLogOut}>Logout</button>
      {/* Display other user data here */}
    </div>
  );
};

export default Profile;
