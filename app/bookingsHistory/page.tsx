import React from "react";
import { getBookingsHistory } from "../actions/getBookingsHistory";
import BookingTable from "./BookingsTable";

const BookingsHistory = async () => {
  const bookingsHistory = await getBookingsHistory();
  console.log(bookingsHistory);
  return <BookingTable bookings={bookingsHistory} />;
};

export default BookingsHistory;
