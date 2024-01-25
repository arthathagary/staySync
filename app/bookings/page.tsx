import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import BookingClient from "./BookingClient";
import { getBookings } from "../actions/getBookings";

const BookingsPage = async () => {
  const bookings: any = await getBookings();
  return (
    <ClientOnly>
      <BookingClient bookings={bookings} />
    </ClientOnly>
  );
};

export default BookingsPage;
