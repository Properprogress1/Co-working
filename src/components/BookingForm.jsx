import React, { useState } from 'react';

const BookingForm = ({ addBooking, bookings }) => {
  const [deskType, setDeskType] = useState('individual');
  const [membershipTier, setMembershipTier] = useState('basic');
  const [deskNumber, setDeskNumber] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const deskNumberInt = parseInt(deskNumber, 10);
    const hoursInt = parseInt(hours, 10);

    if (isDeskBooked(deskNumberInt, deskType)) {
      alert('Desk is already booked!');
      return;
    }

    const price = calculatePrice(deskType, membershipTier, hoursInt);
    addBooking({ deskType, membershipTier, deskNumber: deskNumberInt, hours: hoursInt, price });
    alert(`Desk booked successfully! Total price: $${price.toFixed(2)}`);
    setDeskNumber('');
    setHours('');
  };

  const isDeskBooked = (deskNumber, deskType) => {
    return bookings.some(booking => booking.deskNumber === deskNumber && booking.deskType === deskType);
  };

  const calculatePrice = (deskType, membershipTier, hours) => {
    let rate = 0;
    if (deskType === 'individual') {
      switch (membershipTier) {
        case 'basic':
          rate = 10;
          break;
        case 'premium':
          rate = 15;
          break;
        case 'executive':
          rate = 20;
          break;
        default:
          rate = 0;
      }
    } else if (deskType === 'team') {
      rate = 25;
    }

    let price = rate * hours;
    if (hours > 3) {
      price *= 0.9;
    }
    return price;
  };

  return (
    <div className="booking-form">
      <h2>Book a Desk</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="desk-type">Desk Type:</label>
        <select id="desk-type" value={deskType} onChange={(e) => setDeskType(e.target.value)}>
          <option value="individual">Individual Desk</option>
          <option value="team">Team Desk</option>
        </select>

        {deskType === 'individual' && (
          <>
            <label htmlFor="membership-tier">Membership Tier:</label>
            <select id="membership-tier" value={membershipTier} onChange={(e) => setMembershipTier(e.target.value)}>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="executive">Executive</option>
            </select>
          </>
        )}

        <label htmlFor="desk-number">Desk Number:</label>
        <input
          type="number"
          id="desk-number"
          value={deskNumber}
          onChange={(e) => setDeskNumber(e.target.value)}
          min="1"
          max="15"
          required
        />

        <label htmlFor="hours">Hours:</label>
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
