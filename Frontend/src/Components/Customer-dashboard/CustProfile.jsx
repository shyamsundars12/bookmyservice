import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const CustProfile = () => {
  const [user, setUser] = useState({});  // Initialize user as an empty object
  const [loading, setLoading] = useState(true);  // Loading state for data fetching
  const { id } = useParams();

  const data = {
    _id: id
  };

  useEffect(() => {
    axios.post(`http://localhost:5000/customer/getCustomerById`, data)
      .then((response) => {
        setUser(response.data);  // Set user data on successful API response
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        setLoading(false);  // Stop loading on error
      });
  }, [id]);

  // Check for user address and render fallback if not present
  const address = user?.address || {};  // Fallback to empty object if address is undefined
  const firstLetter = user?.email?.charAt(0)?.toUpperCase();  // First letter of the email for Avatar

  // Handle loading state and ensure data is available before rendering
  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <div className="card">
            <h4 className="card-title" style={{ textAlign: "center" }}>Profile</h4>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <Avatar name={firstLetter} size={100} round={true} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="card-body" style={{ width: "900px" }}>
                <p className="card-text">
                  <strong>First Name:</strong> {user?.fname || 'N/A'}<br />
                  <strong>Last Name:</strong> {user?.lname || 'N/A'}<br />
                  <strong>Email:</strong> {user?.email || 'N/A'}<br />
                  <strong>Contact:</strong> {user?.contact_no || 'N/A'}<br />
                  <strong>House Number:</strong> {address?.house_no || 'N/A'}<br />
                  <strong>Street Name:</strong> {address?.society_name || 'N/A'}<br />
                  <strong>Landmark:</strong> {address?.landmark || 'N/A'}<br />
                  <strong>City:</strong> {address?.city || 'N/A'}<br />
                  <strong>Pincode:</strong> {address?.pincode || 'N/A'}<br />
                </p>
                <br />
                <div className="container justify-content-center align-items-center">
                  <Link to={`/Customer/CustEditProfile/${localStorage.getItem('id')}`} className="btn btn-primary">Edit Profile</Link>
                  <Link to="/" className="btn btn-dark" style={{ marginLeft: "40px" }}>Back To Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CustProfile;
