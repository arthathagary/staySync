"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import RoomsCard from "@/app/rooms/RoomsCard";

interface TripsClientProps {
  bookings?: any;
  currentUser?: any | null;
}

const BookingClient: React.FC<TripsClientProps> = ({
  bookings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/bookings/${id}`)
        .then(() => {
          toast.success("Re allocate room successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  console.log(bookings);

  return (
    <Container>
      <Heading title="Bookings" subtitle="booking details" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {bookings.map((booking: any) => (
          <RoomsCard
            key={booking.id}
            data={booking}
            booking={booking}
            actionId={booking.id}
            onAction={onCancel}
            disabled={deletingId === booking.id}
            actionLabel="Re Allocate Room"
            // currentUser={currentUser}
          />
        ))}
        {/* {bookings.map((booking: any, index: any) => (
          <div key={index}>{booking.userId}</div>
        ))} */}
      </div>
    </Container>
  );
};

export default BookingClient;
