import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userImage from '../images/hotel1.jpg';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User ID not found in local storage.');
          setLoading(false);
          return;
        }

        // Make API request with retrieved user ID
        const response = await axios.get('http://localhost:8080/api/user/id', {
          params: { userId: userId } // Pass the retrieved ID
        });

        console.log("API Response:", response.data);

        // Extract and set the 'user' object
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setError('No user data found.');
        }
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-info">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
        <div className="card-body p-5">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={userImage}
                alt="Profile"
                className="rounded-circle img-fluid"
                style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '70px' }}
              />
              <h3 className="mt-3">{user.firstName} {user.lastName}</h3>
              <p className="text-muted">{user.emailId}</p>
            </div>

            <div className="col-md-8">
              <h4 className="mb-4 text-primary">Profile Information</h4>
              <div className="row">
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>First Name:</strong>
                  <span>{user.firstName || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Last Name:</strong>
                  <span>{user.lastName || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Gender:</strong>
                  <span>{user.sex || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Email:</strong>
                  <span>{user.emailId || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Contact:</strong>
                  <span>{user.contact || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>City:</strong>
                  <span>{user.city || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>State:</strong>
                  <span>{user.state || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Pincode:</strong>
                  <span>{user.pincode || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Role:</strong>
                  <span>{user.role || 'N/A'}</span>
                </div>
                <div className="col-12 mb-2 d-flex justify-content-between">
                  <strong>Hotel ID:</strong>
                  <span>{user.hotelId || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
