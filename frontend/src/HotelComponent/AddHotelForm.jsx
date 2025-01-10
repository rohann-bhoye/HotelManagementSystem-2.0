import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHotelForm = () => {
  const [locations, setLocations] = useState([]);
  const [hotelUsers, setHotelUsers] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const [hotel, setHotel] = useState({
    name: "",
    description: "",
    locationId: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    userId: "",
  });

  let navigate = useNavigate();

  // Fetch all locations
  const retrieveAllLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/location/fetch");
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch all hotel users
  const retrieveAllHotelUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/hotel");
      return response.data;
    } catch (error) {
      console.error("Error fetching hotel users:", error);
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      const [allLocations, allHotelUsers] = await Promise.all([
        retrieveAllLocations(),
        retrieveAllHotelUsers()
      ]);
      if (allLocations) {
        setLocations(allLocations.locations || []);
      }
      if (allHotelUsers) {
        setHotelUsers(allHotelUsers.users || []);
      }
    };

    getAllData();
  }, []);

  // Handle input changes
  const handleInput = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    const { name, locationId, emailId, description, pricePerDay, totalRoom, street, pincode, userId } = hotel;
    if (!name || !locationId || !emailId || !description || !pricePerDay || !totalRoom || !street || !pincode || !userId) {
      return "All fields are required.";
    }
    if (isNaN(pricePerDay) || isNaN(totalRoom) || isNaN(pincode)) {
      return "Price per day, total room, and pincode must be numbers.";
    }
    return null;
  };

  // Handle form submission
  const saveHotel = async (e) => {
    e.preventDefault();

    // Validate form data
    const error = validateForm();
    if (error) {
      console.error("Validation error:", error);
      alert(error);
      return;
    }

    const formData = new FormData();
    if (selectedImage1) formData.append("image1", selectedImage1);
    if (selectedImage2) formData.append("image2", selectedImage2);
    if (selectedImage3) formData.append("image3", selectedImage3);

    formData.append("name", hotel.name);
    formData.append("locationId", hotel.locationId);
    formData.append("description", hotel.description);
    formData.append("street", hotel.street);
    formData.append("pincode", hotel.pincode);
    formData.append("emailId", hotel.emailId);
    formData.append("pricePerDay", hotel.pricePerDay);
    formData.append("totalRoom", hotel.totalRoom);
    formData.append("userId", hotel.userId);

    try {
      const response = await axios.post("http://localhost:8080/api/hotel/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Hotel added successfully:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error adding the hotel:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4 shadow-lg animate__animated animate__fadeIn">
            <h2 className="text-center mb-4">Add Hotel</h2>
            <form onSubmit={saveHotel}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hotel Name"
                      name="name"
                      onChange={handleInput}
                      value={hotel.name}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Location</label>
                    <select
                      className="form-control"
                      name="locationId"
                      onChange={handleInput}
                      value={hotel.locationId}
                    >
                      <option value="">Select Location</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Hotel Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Hotel Email"
                      name="emailId"
                      onChange={handleInput}
                      value={hotel.emailId}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Hotel Description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={hotel.description}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Price Per Day</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Price Per Day"
                      name="pricePerDay"
                      onChange={handleInput}
                      value={hotel.pricePerDay}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Total Rooms</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Total Rooms"
                      name="totalRoom"
                      onChange={handleInput}
                      value={hotel.totalRoom}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Street</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Street"
                      name="street"
                      onChange={handleInput}
                      value={hotel.street}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Pin Code</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Pin Code"
                      name="pincode"
                      onChange={handleInput}
                      value={hotel.pincode}
                    />
                  </div>
                </div>

                {/* Right side for images and user selection */}
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Hotel Manager</label>
                    <select
                      className="form-control"
                      name="userId"
                      onChange={handleInput}
                      value={hotel.userId}
                    >
                      <option value="">Select Hotel Manager</option>
                      {hotelUsers.map((hotelUser) => (
                        <option key={hotelUser.id} value={hotelUser.id}>
                          {hotelUser.firstName + " " + hotelUser.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Hotel Image 1</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(e) => setSelectedImage1(e.target.files[0])}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Hotel Image 2</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(e) => setSelectedImage2(e.target.files[0])}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Hotel Image 3</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(e) => setSelectedImage3(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelForm;
