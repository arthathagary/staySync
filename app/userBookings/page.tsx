"use client";
import { useEffect, useState } from "react";
import getUserBooking from "../actions/getUserBooking";
import BookingClient from "./BookingClient";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { getCurrentUsers } from "../actions/getCurrentUser";
import { findUserByEmail } from "../actions/FindUser";
import { query } from "../database/db";

const BookingDetail = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const currentUser = await getCurrentUsers({ token });
      const { email } = currentUser[0];
      console.log(email);
      // Fetch the booking data using the token
      const userBooking = await getUserBooking("2");
      setBooking(userBooking);
    };

    fetchData();
  }, []);

  return (
    <ClientOnly>
      {booking ? <BookingClient bookings={booking} /> : <EmptyState />}
    </ClientOnly>
  );
};

export default BookingDetail;
