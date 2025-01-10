

// export default Hotel;
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import HotelCard from "./HotelCard";
import HotelCarousel from "./HotelCarousel";
import GetHotelFacilities from "../FacilityComponent/GetHotelFacilities";
import GetHotelReviews from "../HotelReviewComponent/GetHotelReviews";
import Footer from "../page/Footer";
import './Hotel.css';

import HotelRoomAvailableStatus from "./HotelRoomAvailableStatus";

const Hotel = () => {
  const { hotelId, locationId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    image1: "",
    image2: "",
    image3: "",
    location: { id: "", city: "", description: "" },
    facility: [],
    rooms: [],
  });

  const [hotels, setHotels] = useState([]);
  const [bookingStatus, setBookingStatus] = useState([]);
  const [booking, setBooking] = useState({
    userId: "",
    hotelId: hotelId,
    checkIn: "",
    checkOut: "",
    totalPerson: 0,
    hotelRoomId: "",
  });
  const [selectedHotelRoomForStatus, setSelectedHotelRoomForStatus] = useState("");
  const [tempSelectedHotelRoomForStatus, setTempSelectedHotelRoomForStatus] = useState("");

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const retrieveHotel = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/hotel/id?hotelId=${hotelId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      toast.error("Failed to fetch hotel details.");
    }
  };

  const retrieveHotelsByLocation = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/hotel/location?locationId=${locationId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hotels by location:", error);
      toast.error("Failed to fetch hotels by location.");
    }
  };

  useEffect(() => {
    const getHotel = async () => {
      const data = await retrieveHotel();
      if (data) {
        setHotel(data.hotel);
        setBookingStatus(data.bookingStatus);
      }
    };

    const getHotelsByLocation = async () => {
      const data = await retrieveHotelsByLocation();
      if (data) {
        setHotels(data.hotels);
      }
    };

    getHotel();
    getHotelsByLocation();
  }, [hotelId, locationId]);

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: booking.totalPerson,
        userId: userId,
        hotelId: hotelId,
      }),
    })
    .then((result) => {
      if (result.ok) {
        toast.success("Products added to Cart Successfully!!!");
      } else {
        toast.error("Failed to add products to cart.");
      }
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add products to cart.");
    });
  };

  const bookHotel = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book the hotels!!!");
      return;
    }
    if (!booking.hotelRoomId || booking.hotelRoomId === "0") {
      toast.error("Please Select Room!!!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("hotelId", hotelId);
    formData.append("checkIn", booking.checkIn);
    formData.append("checkOut", booking.checkOut);
    formData.append("totalPerson", booking.totalPerson);
    formData.append("hotelRoomId", booking.hotelRoomId);

    axios.post("http://localhost:8080/api/book/hotel/", formData)
      .then((result) => {
        const res = result.data;
        if (res.responseCode === 0) {
          toast.success(res.responseMessage);
        } else {
          toast.error(res.responseMessage);
        }
      })
      .catch((error) => {
        console.error("Error booking hotel:", error);
        toast.error("Failed to book hotel.");
      });
  };

  const navigateToAddHotelFacility = () => {
    navigate(`/hotel/${hotelId}/add/facility`);
  };

  const navigateToAddReviewPage = () => {
    navigate(`/hotel/${hotelId}/location/${locationId}/add/review`);
  };

  const viewBookingStatus = (e) => {
    e.preventDefault();
    if (!tempSelectedHotelRoomForStatus) {
      toast.error("Select Hotel Room!!!");
      return;
    }

    const hotelRoomId = tempSelectedHotelRoomForStatus.split("_")[0];

    fetch(`http://localhost:8080/api/book/hotel/fetch/hotel/room/booking/status?hotelRoomId=${hotelRoomId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((result) => result.json())
    .then((res) => {
      if (res.responseCode === 0) {
        setBookingStatus(res.bookingStatus);
      } else {
        toast.error(res.responseMessage || "Server error.");
      }
    })
    .catch((error) => {
      console.error("Error fetching booking status:", error);
      toast.error("Failed to fetch booking status.");
    });
  };

  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-sm-3 mt-2">
          <div className="card form-card border-color custom-bg">
            <HotelCarousel item={hotel} />
          </div>
        </div>
        <div className="col-sm-5 mt-2">
          <div className="card form-card border-color custom-bg">
            <div className="card-header bg-color">
              <h1 className="custom-bg-text hoteltitle">{hotel.name}</h1>
            </div>
            <div className="card-body text-left text-color">
              <h3>Description :</h3>
              <h4 className="card-text">{hotel.description}</h4>
            </div>
            <div className="card-footer custom-bg">
              <div className="d-flex justify-content-between">
                <p><h4>Price : &#8377;{hotel.pricePerDay}</h4></p>
                <p className="text-color hoteltotalroom"><b>Total Room : {hotel.totalRoom}</b></p>
              </div>
              <form className="row g-3" onSubmit={bookHotel}>
                <div className="col-auto">
                  <label htmlFor="checkin">Check-in</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkin"
                    name="checkIn"
                    onChange={handleBookingInput}
                    value={booking.checkIn}
                    required
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="checkout">Check-out</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkout"
                    name="checkOut"
                    onChange={handleBookingInput}
                    value={booking.checkOut}
                    required
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="room">Room</label>
                  <select
                    name="hotelRoomId"
                    onChange={handleBookingInput}
                    className="form-control"
                    required
                  >
                    <option value="0">Select Room</option>
                    {hotel.rooms.map((room) => (
                      <option key={room.id} value={room.id}>Room {room.roomNumber}</option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="totalPerson">Total Person</label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalPerson"
                    name="totalPerson"
                    onChange={handleBookingInput}
                    value={booking.totalPerson}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <input
                    type="submit"
                    className="btn custom-bg bg-color mb-3"
                    value="Book Hotel"
                  />
                  <ToastContainer />
                </div>
              </form>
              {admin && (
                <div>
                  <input
                    type="button"
                    className="btn custom-bg bg-color mb-3"
                    value="Add Facilities"
                    onClick={navigateToAddHotelFacility}
                  />
                </div>
              )}
              {user && (
                <div>
                  <input
                    type="button"
                    className="btn custom-bg bg-color mb-3"
                    value="Add Review"
                    onClick={navigateToAddReviewPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-2 mt-2">
          <GetHotelFacilities item={hotel} />
        </div>
        <div className="col-sm-2 mt-2">
          <GetHotelReviews item={hotel} />
        </div>
      </div>
      <div className="row mt-3">
        <HotelRoomAvailableStatus
          availableStatus={bookingStatus}
          hotelRoom={selectedHotelRoomForStatus.split("_")[1]}
        />
      </div>
      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Hotels in {hotel.location.city} Location:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {hotels.map((h) => (
              <HotelCard key={h.id} item={h} />
            ))}
          </div>
        </div>
      </div>
      <br />
      <hr />
      <Footer />
    </div>
  );
};

export default Hotel;
