import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [selectedResource, setSelectedResource] = useState("");
  const [bookings, setBookings] = useState([]);

  const resources = [
    "Conference Room",
    "Projector",
    "Computer Lab",
    "College Bus"
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setPage("dashboard");
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newBooking = {
      resource: selectedResource,
      date: formData.get("date"),
      time: formData.get("time"),
    };

    setBookings([...bookings, newBooking]);
    setPage("history");
  };

  return (
    <div className="app">
      {page === "login" && (
        <div className="login-container">
          <div className="login-card">
            <h2>Resource Booking System</h2>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {page !== "login" && (
        <div className="main-container">
          <div className="sidebar">
            <h3>Menu</h3>
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
            <button onClick={() => setPage("history")}>Booking History</button>
            <button onClick={() => setPage("login")}>Logout</button>
          </div>

          <div className="content">
            {page === "dashboard" && (
              <>
                <h2>Available Resources</h2>
                <div className="cards">
                  {resources.map((item) => (
                    <div className="card" key={item}>
                      <h3>{item}</h3>
                      <p>Status: <span className="available">Available</span></p>
                      <button
                        onClick={() => {
                          setSelectedResource(item);
                          setPage("booking");
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {page === "booking" && (
              <div className="booking-card">
                <h2>Book {selectedResource}</h2>
                <form onSubmit={handleBooking}>
                  <label>Date</label>
                  <input type="date" name="date" required />

                  <label>Time</label>
                  <input type="time" name="time" required />

                  <button type="submit">Confirm Booking</button>
                </form>
              </div>
            )}

            {page === "history" && (
              <>
                <h2>Booking History</h2>
                {bookings.length === 0 ? (
                  <p>No bookings yet.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Resource</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, index) => (
                        <tr key={index}>
                          <td>{b.resource}</td>
                          <td>{b.date}</td>
                          <td>{b.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;