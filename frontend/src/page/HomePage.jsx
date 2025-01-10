import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HotelCard from "../HotelComponent/HotelCard";
import "bootstrap/dist/css/bootstrap.min.css";
import './home.css';
import Footer from "./Footer";

const HomePage = () => {
  const [hotels, setHotels] = useState([]); // State for storing hotel data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { locationId } = useParams(); // Retrieve locationId from URL if available

  const welcomeRef = useRef(null); // Reference for welcome text

  // Fetch hotel data based on locationId or all hotels if not present
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const url = locationId
          ? `http://localhost:8080/api/hotel/location?locationId=${locationId}`
          : "http://localhost:8080/api/hotel/fetch";
        const response = await axios.get(url);
        setHotels(response.data.hotels); // Update state with hotels
      } catch (error) {
        setError("Error fetching hotels: " + error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchHotels();
  }, [locationId]);

  // Add class to trigger CSS animation
  useEffect(() => {
    if (welcomeRef.current) {
      welcomeRef.current.classList.add('show');
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Hotels...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Carousel Section */}
      <div className="carousel-section p-3 bg-light rounded shadow">
        <Carousel />
      </div>

      {/* Welcome Text with CSS Transition */}
      <div
        className="welcome-text my-4 d-flex justify-content-between align-items-center"
        ref={welcomeRef}
      >
        <h2>Welcome to Our Hotel</h2>
      </div>

      {/* Hotel Cards Section */}
      <div className="row mt-4 g-4">
        {hotels.map((hotel) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={hotel.id}
          >
            <div className="card border-0 shadow">
              {/* Display Hotel Image */}
            
              {/* Hotel Details */}
              <HotelCard item={hotel} />
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;
