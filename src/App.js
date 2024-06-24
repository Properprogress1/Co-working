import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import Dashboard from './components/DashBoard';
;

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [revenue, setRevenue] = useState({ basic: 0, premium: 0, executive: 0, team: 0 });

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
    updateRevenue(newBooking);
  };

  const updateRevenue = (booking) => {
    let { deskType, membershipTier, price } = booking;
    setRevenue((prevRevenue) => {
      let newRevenue = { ...prevRevenue };
      if (deskType === 'individual') {
        newRevenue[membershipTier] += price;
      } else if (deskType === 'team') {
        newRevenue.team += price;
      }
      return newRevenue;
    });
  };

  return (
    <div className="container">
      <h1>Co-working Space Booking System</h1>
      <BookingForm addBooking={addBooking} bookings={bookings} />
      <Dashboard revenue={revenue} />
    </div>
  );
};

export default App;
