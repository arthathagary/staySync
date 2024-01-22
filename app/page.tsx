import { getCurrentUsers } from "./actions/getCurrentUser";
import { getRooms } from "./actions/getRooms";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/NavBar";
import ToasterProvider from "./providers/ToasterProvider";

import RoomsCard from "./rooms/RoomsCard";
export default async function Home() {
  const rooms = await getRooms();
  // const currentUser = await getCurrentUsers();
  console.log(rooms);

  return (
    <ClientOnly>
      <div>
        {/* <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal /> */}
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
      </div>
      <Container>
        <div
          className="
      pt-48
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
          {rooms.map((room: any) => (
            <RoomsCard
              // currentUser={currentUser}
              key={room.id}
              data={room}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
