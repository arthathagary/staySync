// import getCurrentUser from "@/app/actions/getCurrentUser";
// import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import BookingClient from "../BookingClient";
import getBookingsById from "@/app/actions/getBookingsById";
import Image from "next/image";
import getUserById from "@/app/actions/getUserById";
import getSpecificRoom from "@/app/actions/getSpecificRoom";

interface IParams {
  bookingsId?: any;
}

const BookingPage = async ({ params }: { params: IParams }) => {
  const bookings = await getBookingsById(params);
  const userId = bookings.userId;
  console.log(userId);
  const user = await getUserById(userId);
  const room = await getSpecificRoom(bookings.roomId);
  console.log(room);

  //   const currentUser = await getCurrentUser();

  if (!bookings) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="w-[80vw]  mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <Image
          className="w-full h-48 object-cover"
          src={bookings.imageSrc}
          alt="Booking"
          width={500}
          height={300}
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{`Booking #${bookings.id}`}</h2>
          <p className="text-gray-600 mb-2">{`Room ID: ${bookings.roomId}`}</p>
          <p className="text-gray-600 mb-2">{`User ID: ${bookings.userId}`}</p>
          <p className="text-gray-600 mb-2">{`User Name: ${user.name}`}</p>
          <p className="text-gray-600 mb-2">{`User Email: ${user.email}`}</p>
          <p className="text-gray-600 mb-2">{`Room title: ${room.title}`}</p>
          <p className="text-gray-600 mb-2">{`Room description: ${room.description}`}</p>
          <p className="text-gray-600 mb-2">{`Room category: ${room.category}`}</p>
          <p className="text-gray-600 mb-2">{`Room locationValue: ${room.locationValue}`}</p>
          <p className="text-gray-600 mb-2">{`Start Date: ${new Date(
            bookings.startDate
          ).toLocaleString()}`}</p>
          <p className="text-gray-600 mb-2">{`End Date: ${new Date(
            bookings.endDate
          ).toLocaleString()}`}</p>
          <p className="text-gray-600 mb-2">{`Total Price: ${bookings.totalPrice}/- LKR`}</p>
        </div>
      </div>
      <></>
    </ClientOnly>
  );
};

export default BookingPage;
