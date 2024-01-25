import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import BookingClient from "./BookingClient";
import getUserBooking from "../actions/getUserBooking";
import { getCurrentUsers } from "../actions/getCurrentUser";

const UserBookingPage = async ({ token }: { token: string }) => {
  //   const booking: any = await getUserBooking("2");
  //   console.log(booking);
  return (
    <ClientOnly>
      <BookingClient bookings={booking} />
    </ClientOnly>
  );
};

export default UserBookingPage;
