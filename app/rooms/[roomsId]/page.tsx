// import getCurrentUser from "@/app/actions/getCurrentUser";
import getRoomsById from "@/app/actions/getRoomsById";
// import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import RoomsClient from "./RoomsClient";

interface IParams {
  roomsId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const rooms = await getRoomsById(params);
  console.log(params.roomsId);
  console.log(rooms);
  //   const reservations = await getReservations(params);
  //   const currentUser = await getCurrentUser();

  if (!rooms) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RoomsClient
        rooms={rooms[0]}
        // reservations={reservations}
        // currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
